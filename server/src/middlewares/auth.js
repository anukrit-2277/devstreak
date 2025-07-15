const jwt=require("jsonwebtoken")
const User=require("../models/user")
require('dotenv').config()
const SECRET_JWT=process.env.SECRET_JWT
const userAuth=async (req,res,next)=>{
    try{
    const {token}=req.cookies;
    if(!token){
        throw new Error("Invalid token!!")
    }
    const {_id}=await jwt.verify(token,SECRET_JWT);
    const user= await User.findById(_id);
    if(!user){
        throw new Error ("No user found");
    }
    req.user=user;
    next();
    }
    catch(err){
        res.status(400).send("error "+err.message);

    }
}
module.exports={userAuth};