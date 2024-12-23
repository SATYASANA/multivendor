import mongoose from 'mongoose'
const productVariationSchema = new mongoose.Schema({
   color:{
    type:String,
    required:true,
   },
   size:{
    type:String,
    required:true,
   },
   quantity:{
    type:String,
    required:true,
   },
   price:{
    type:String,
    required:true
   }
},{_id:false})
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    subcategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'

    },
    brand:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Brand'
    },
    image:[String],

    variations:[productVariationSchema],
    ratingAverage:{
        type:Number,
        default:0
    },
    ratingQuantity:{
        type:Number,
        default:0,
    },
    eviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
    
},{timestamps:true})

export const Product = mongoose.model('Product',productSchema)

