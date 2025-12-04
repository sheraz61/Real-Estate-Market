import User from "../models/user.model.js"
import bcrypt from "bcrypt"

export const signup= async (req,res,next)=>{
const {username,email,password}=req.body
const hashpassword=bcrypt.hashSync(password,10)
const userExist=await User.findOne({email})
if (userExist){
    return res.status(400).json({
        message:"Email already exist",
        success:false
    })
}
const newUser=new User({
    username,
    email,
    password:hashpassword
})
try {
    await newUser.save()
    res.status(201).json({
        message:'User created successfully',
        success:true
    })
    
} catch (error) {
    next(error)
}
}