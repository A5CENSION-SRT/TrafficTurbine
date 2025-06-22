import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import deviceDataSchema from "./models/deviceDataSchema.js";
dotenv.config(); // intialize config 

const app = express();
const PORT = process.env.PORT || 5000; //intialize app

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err)); // connect to MongoDB

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // start the server
});

app.get("/",(req,res) =>{
    res.send("Welcome to the Energy Data API"); //test route
});

app.post("/api/data", async (req, res) => {
    const { voltage, current, power, energy, time, deviceId } = req.body;

    if (voltage < 0 || current < 0) {
        return res.status(400).json({ error: "Voltage and current must be non-negative." });
    }

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

        const newData = new DeviceDataModel({ voltage, current, power, energy, time: time || new Date() });
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
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch data", details: err.message });
    }
});

