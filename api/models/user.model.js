import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
         type:String,
        required:true,
        unique:true,
    },
    password:{
         type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:"https://st.depositphotos.com/2101611/3925/v/950/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"
    },
    public_id:{
        type:String,
        default:null
    }
},{timestamps:true})

const User=mongoose.model('User',userSchema)
export default User;