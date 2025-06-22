import mongoose from "mongoose";

const deviceDataSchema = new mongoose.Schema({
    voltage: { type: Number, required: true },
    current: { type: Number, required: true },
    power: { type: Number, required: true },
    energy: { type: Number, required: true },
    time: { type: Date, required: true, default: Date.now },
});

export default deviceDataSchema;
