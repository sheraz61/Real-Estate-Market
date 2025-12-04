import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import {errorHandler} from '../utils/error.js'
import jwt from 'jsonwebtoken'
export const signup= async (req,res,next)=>{
const {username,email,password}=req.body
const hashpassword=bcrypt.hashSync(password,10)
const userExist=await User.findOne({email})
if (userExist){
    return next(errorHandler(400,'Email already exist'))
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

export const signin= async(req,res,next)=>{
const {email,password}=req.body
try {
    const user=await User.findOne({email})
    if(!user){
        return next(errorHandler(404,'User not found'))
    }
    const validPassword=bcrypt.compareSync(password,user.password)
    if(!validPassword){
        return next(errorHandler(401,'Invalid Credentials'))
    }
    const {password:pass,...rest}=user._doc
    const token=jwt.sign({id:user._id},process.env.JWT_SEC)
    res.cookie('access_token',token,{
        httpOnly:true
    }).status(200).json({
        message:'Login Successfull',
        success:true,
        rest
    })
} catch (error) {
    next(error)
}
}