import express from 'express'
import { google, signin, signup,signout } from '../controllers/auth.controller.js'
const router=express.Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/google',google)
router.get('/signup',signout)



export default router
