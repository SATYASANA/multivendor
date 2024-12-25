import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';  // bcryptjs is not required here if password is hashed in the model.
import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../utils/utils.js';

export const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Validate input (simple checks for example, you can use libraries like 'express-validator' for more complex validation)
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'All fields (name, email, password) are required.',
        });
    }

    try {
        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

        // Create a new user, password will be hashed automatically from the model pre-save hook
        const user = await User.create({
            name,
            email,
            password,
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Error in creating user',
            });
        }

        // Send response with user data (you may choose to exclude sensitive data like password)
        return res.status(201).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error(error);  // Log error for debugging
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,  // Optionally, send error message for debugging
        });
    }
});


export const loginUser = expressAsyncHandler(async (req,res)=>{
    const {email,password} = req.body;

 try {
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:'All fields are mandatory'
        })
    }
    const user = await User.findOne({email})
   
    if(!user){
        return res.status(400).json({
            message:"User already exists"
        })
    }
if(user && await user.comparePassword(password,user.password)){
    return res.status(200).json({
        success:true,
        message:'user logged in successfuly',
        _id:user._id,
        name:user.name,
        email:user.email,
        token:generateToken(user._id,user.role)
     
    })
}
else{
    return res.status(400).json({
        success:false,
        message:"Password is not correct"
    })
}
 } catch (error) {
    return res.status(400).json({
        success:false,
       error
    })
 }
})


//@des Get a user profiel
//@router /api/user/profile
//@access Private

export const profile = expressAsyncHandler(async(req,res)=>{
    const {_id} = req.body;
   try {
    const user = await User.findById(_id).select('-password');
    if(!user){
        return res.status(200).json({
            success:false,
            message:"User doesn't exist"
        })
    }
    return res.status(200).json({
        success:true,
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        phone:user.phone,
        isActive:user.isActive
    })
   } catch (error) {
    return res.status(400).json({
        success:false,
        error
    })
   }

})

//@des update a user profiel
//@router /api/user/updateProfile
//@access Private


export const updateProfile = expressAsyncHandler(async(req,res,next)=>{
  try {
    const {_id} = req.body;
    const user = await User.findById(_id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password
        }
        user.address = req.body.address || user.address;
        user.phone = req.body.phone || user.phone
        user.role = req.body.role || user.role

        const updateUser = await user.save()
        return res.status(200).json({
            success:true,
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            phone:user.phone,
            isActive:user.isActive
        })
    }
    else{
        return res.status(400).json({
            success:false,
            message:'User not found'
        })
    }
  } catch (error) {
    return res.status(400).json({
        error
    })
  }
})

export const getAllUser = expressAsyncHandler(async(req,res,next)=>{
  try {
    const user = await User.find().select('-password')
    if(!user){
        return res.status(400).json({
            success:false,
            message:"error in getting profile"
        })
    }
    return res.status(200).json({
        success:true,
        user
    })
  } catch (error) {
    return res.status(400).json({
        error
    })
  }
})

export const deleteProfie = expressAsyncHandler(async(req,res,next)=>{
   try {
    const {id} = req.params;
    const user = await User.findByIdAndDelete({_id:id});
    return res.status(200).json({
        success:true,
        message:'uer deleted successfullly'
    })
   } catch (error) {
    return res.status(200).json({
        success:false,
        error
    })
   }
    
})