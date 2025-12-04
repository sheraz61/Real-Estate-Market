import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config()
const app = express()
app.use(express.json())
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connect to database')
}).catch((err)=>{
    console.log(err)
})
app.listen(3000,()=>{
    console.log('server listen at port 3000')
})

app.get('/',(req,res)=>{
    res.send('Hellow World')
})

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)

//middleware

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500
    const message= err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})