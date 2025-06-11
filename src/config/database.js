const mongoose=require("mongoose")
require('dotenv').config()
const DB_LINK=process.env.DB_LINK
const connectDB=async()=>{
   await mongoose.connect(DB_LINK);
}
module.exports=connectDB;