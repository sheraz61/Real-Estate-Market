import express from 'express'
import { createListing,deleteListing } from '../controllers/listing.controller.js'
import { verifyToken } from '../middlewares/auth.js'
import upload from '../middlewares/multer.js';
import { setUploadTarget } from '../middlewares/setUploadTarget.js'
const router = express.Router()

router.post('/create',
     verifyToken, 
     setUploadTarget('listing'),
      upload.array('images', 6), 
      createListing)
router.delete('/delete',verifyToken,deleteListing)
export default router
