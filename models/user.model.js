import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['vendor','admin','user'],
        default:'user'
    },
    address:{
        city:{
            type:String
        },
        state:{
            type:String
        },
        country:{
            type:String
        }
    },
    phone:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

userSchema.pre('save',async(next)=>{
    if(!this.isModified(password)){
        return next();
    }
    this.password =await bcrypt.hash(this.password,12)
    next();
})

userSchema.methods.comparePassword = async function(passwordBody,storedPassword){
   return await bcrypt.compare(passwordBody,storedPassword)
}

export const User = mongoose.model("User",userSchema)