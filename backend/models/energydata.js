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
    },
    power:{
        type:Number,
        required:true,
        min:0
    },
    energy:{
        type:Number,
        required:true,
        min:0
    },
    deviceId:{ 
        type: Number,
        required: true
    }

})

const EnergyData =  mongoose.model('energy',energyDataSchema)

export default EnergyData