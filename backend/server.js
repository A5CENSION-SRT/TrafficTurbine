import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import deviceDataSchema from "./models/deviceDataSchema.js";
dotenv.config(); // intialize config 

const app = express();

// Use environment variables for configuration
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MONGO_URI;

// Allow requests from any origin (for development or public API)
app.use(cors());

app.use(express.json());

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }); // connect to MongoDB

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // start the server
});

app.get("/",(req,res) =>{
    res.send("Welcome to the Energy Data API"); //test route
});

app.post("/api/data", async (req, res) => {
    const { voltage, current, power, energy, batteryLevel, time, deviceId } = req.body;
    try {
       
        const deviceCollectionName = String(deviceId).trim();
        if (!deviceCollectionName) {
            return res.status(400).json({ error: "Invalid deviceId." });
        }


        const DeviceDataModel = mongoose.models[deviceCollectionName] || mongoose.model(
            deviceCollectionName,
            deviceDataSchema,
            deviceCollectionName
        );

        const newData = new DeviceDataModel({ voltage, current, power, energy, batteryLevel, time: time || new Date() });
        await newData.save();

        res.status(201).json({ message: "Energy data saved successfully", data: newData });
    } catch (err) {
        console.error("Error saving energy data:", err); // Log detailed error
        res.status(500).json({ error: "Failed to save energy data", details: err.message });
    }
}); // endpoint to save energy data based on the id 

app.get("/api/data/:deviceId", async (req, res) => {
    const { deviceId } = req.params; // Extract deviceId from the URL

    try {
        // Dynamically use the model for the device
        const DeviceDataModel = mongoose.models[deviceId] || mongoose.model(
            deviceId,
            deviceDataSchema,
            deviceId
        );

        const data = await DeviceDataModel.find();
        console.log(`Fetched data for deviceId ${deviceId}:`, data); // Log data to terminal
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch data", details: err.message });
    }
});

