import express from 'express'
import upload from '../middlewares/multer.js';
import { uploadImage ,updateUser,deleteUser,getUserListing,getUser} from '../controllers/user.controller.js';
import {verifyToken} from '../middlewares/auth.js'
import { setUploadTarget } from '../middlewares/setUploadTarget.js';
const router=express.Router();


router.get('/test',(req,res)=>{
    res.send('hello')
})
router.put(
  "/avatar",
  verifyToken,
  setUploadTarget('user'),
  upload.single("image"),
  uploadImage
);
router.get('/:id',verifyToken,getUser)
router.get('/listings/:id',verifyToken,getUserListing)
router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
export default router