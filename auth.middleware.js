import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

export const protect = async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
        next()
        
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    }
    if(!token){
        return res.status(401).json({
            message:"No token attached to the header"
        })
    }
}

export const authorize = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                success:false,
                message:"You don't have permission"
            })
        }
        next()
    }
}