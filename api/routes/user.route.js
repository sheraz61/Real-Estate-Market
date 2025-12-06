import express from 'express'
import upload from '../middlewares/multer.js';
import { uploadImage ,updateUser} from '../controllers/user.controller.js';
import {verifyToken} from '../middlewares/auth.js'

const router=express.Router();


router.get('/test',(req,res)=>{
    res.send('hello')
})

router.put(
  "/avatar",
  verifyToken,
  upload.single("image"),
  uploadImage
);
router.post('/update/:id',verifyToken,updateUser)
export default router