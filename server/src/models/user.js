const mongoose=require("mongoose")
const bcrypt=require('bcrypt');
const jwt= require("jsonwebtoken");
require('dotenv').config()
const SECRET_JWT=process.env.SECRET_JWT
const userSchema = new mongoose.Schema({
  firstName:{
    type:String,
    required:true,
    minLength:3
        
    },
  lastName:{
    type:String,
    required:true
        },
  emailId:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
},
  photoURL: { type: String },
  password: {
    type:String,
    required:true,
  }, 

  googleId: { type: String },
  githubId: { type: String },

  linkedIn: {
    accessToken: { type: String },
    refreshToken: { type: String },
    isConnected: { type: Boolean, default: false }
  },
  twitter: {
    accessToken: { type: String },
    accessTokenSecret: { type: String },
    isConnected: { type: Boolean, default: false }
  },

  createdAt: { type: Date, default: Date.now }
});


userSchema.methods.getJWT=async function(){
    const token=await jwt.sign({_id:this._id},SECRET_JWT);
    return token;
}

userSchema.methods.validatePassword=async function(passwordInputByUser){
    const passwordHash=this.password;
     const isValidPassword=await bcrypt.compare(passwordInputByUser,passwordHash );

     return isValidPassword

}
module.exports=mongoose.model("User",userSchema);