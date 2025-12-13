import express from 'express'
import { createListing, deleteListing, getListings, getListing, updateListing } from '../controllers/listing.controller.js'
import { verifyToken } from '../middlewares/auth.js'
import upload from '../middlewares/multer.js';
import { setUploadTarget } from '../middlewares/setUploadTarget.js'
const router = express.Router()

router.post('/update/:id',
      verifyToken,
      setUploadTarget('listing'),
      upload.array('images', 6),
      updateListing)
router.post('/create',
      verifyToken,
      setUploadTarget('listing'),
      upload.array('images', 6),
      createListing)
router.get('/get/:id', getListing)
router.delete('/delete/:id', verifyToken, deleteListing)
router.get('/get', getListings)
export default router
