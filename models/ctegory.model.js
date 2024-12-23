import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
    },
    parentCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    subCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Categry'
    }
},{timestamps:true})

export const Category = mongoose.model('Category',categorySchema)