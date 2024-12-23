import mongoose from 'mongoose'

const brandSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
    },
    logo:{
        type:String
    }
},{timestamps:true})

export const Brand = mongoose.model('Brand',brandSchema)