import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";
import { errorHandler } from "../utils/error.js";

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

    // Success response
    res.status(200).json({
      success: true,
      avatar: user.avatar,
    });

  } catch (error) {
    next(error);
  }
};
