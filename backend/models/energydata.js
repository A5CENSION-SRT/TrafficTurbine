import mongoose from "mongoose"
const energyDataSchema = new mongoose.Schema({
    voltage:{
        type :Number,
        required :true,
        min:0
    },
    current:{
        type :Number,
        required :true,
        min:0
    },
    time:{
        type:Date,
        default:Date.now
    }
})

const EnergyData =  mongoose.model('energy',energyDataSchema)

export default EnergyData