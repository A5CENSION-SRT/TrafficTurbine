import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import EnergyData from "./models/energydata.js";
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
    const { voltage, current } = req.body;  

    if (voltage < 0 || current < 0) {
        return res.status(400).json({error: "Voltage and current must be non-negative."});
    }
    try{
        const newData = new EnergyData({voltage, current});
        await newData.save();
        res.status(201).json({message: "Energy data saved successfully", data: newData});
    }
    catch (err){
        res.status(500).json({error: "Failed to save energy data", details: err});
    }
}); // endpoint to save energy data

app.get("/api/data", async(req,res) =>{
    try{
        const data = await EnergyData.find();
        res.status(200).json(data);
    }
    catch (err){
        res.status(500).json({ error: "Failed to fetch data" });
    }
}); // endpoint to retrieve all energy data