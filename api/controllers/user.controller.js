import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from 'bcrypt'

export const uploadImage = async (req, res, next) => {
  try {

    // Check file
    if (!req.file) {
      return next(errorHandler(400, "File not found"));
    }

    const userId = req.user.id;

    // Check user
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Remove previous avatar from cloudinary
    if (user.public_id) {
      await cloudinary.uploader.destroy(user.public_id);
    }

    // Save new avatar data
    user.avatar = req.file.path;
    user.public_id = req.file.filename;

    await user.save();
const {password,...rest}=user._doc
    // Success response
    res.status(200).json({
      message:'avatar updated successfully',
      success: true,
      ...rest
    });

  } catch (error) {
    next(error);
  }
};

export const updateUser= async(req,res,next)=>{
    try {
      if(req.user.id!==req.params.id){
    return next(errorHandler(401,'You can only update your own account'))
  }
      if(req.body.password){
        req.body.password=bcrypt.hashSync(req.body.password,10)
      }
      const updateUser=await User.findByIdAndUpdate(req.params.id,{
        $set:{
          username:req.body.username,
          email:req.body.email,
          password:req.body.password,
          
        }
      },{new:true})
      const {password,...rest}=updateUser._doc;
res.status(200).json({
  message:'Update Info Successfully',
  success:true,
  ...rest
})
    } catch (error) {
      next(error)
    }
  }


export const deleteUser=async(req,res,next)=>{
  try {
     const userId=req.user.id;
     const user=await User.findById(req.params.id)
     if(!user){
      return next(errorHandler(404,'User not found'))
     }
  if (user._id!==userId){
    return next(errorHandler(401,'You can only delete your own account'))
  }
  await User.findByIdAndDelete(req.params.id)
  res.status(200).json({
    message:'User has been deleted',
    success:true
  })
  } catch (error) {
    next(error)
  }
 
}