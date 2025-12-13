// middlewares/uploadCloudinary.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // Default folder
      let folder = 'misc';
    // Logic to determine folder
    if (req.uploadTarget === 'listing') {
      folder = 'estateListing';
    } else if (req.uploadTarget === 'user') {
      folder = 'estateProfile';
    }
    return {
      folder,
      allowed_formats: ['jpeg', 'png', 'jpg'],
      transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
    };
  },
});

const upload = multer({ storage });

export default upload;