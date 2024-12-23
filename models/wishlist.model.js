import mongoose from 'mongoose'

const wishlistModel = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
},{timestamps:true})

export const Wishlist = mongoose.model('Wishlist',wishlistModel)