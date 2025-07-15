const express= require("express")
const connectDB=require("./config/database");
const PROMPT=require("./constants/prompt")
const app=express()
const getResponse=require("./services/getResponse");
const User = require("./models/user");
const { userAuth } = require("./middlewares/auth");
const { validateSignUpData } = require("./utils/validation");
const bcrypt=require("bcrypt");
const cookieParser = require("cookie-parser");
require('dotenv').config()

const PORT=process.env.PORT

connectDB().then( ()=>{
    console.log("DB connection established");
    app.listen(PORT,()=>{
        console.log("server is listening");
    });
}
).catch((err)=>{
    console.error("DB can't be connected");
});
/* app.listen(PORT,()=>{
        console.log("server is listening");
    })*/
app.use(express.json());
app.use(cookieParser());
app.post("/signup",async(req,res)=>{
  const {firstName,lastName,emailId,password} =req.body;
  try{
    validateSignUpData(req);
    const passwordHash=await bcrypt.hash(password, 10);
    const user= new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash
});
    await user.save();
    res.json({
      message:"User added successfully",
      data:user
    });   
}
catch(err){
    res.status(400).send("Can't add user" +" "+ err.message);
  }
});

app.post("/login",async(req,res)=>{
    const {emailId,password}=req.body;
    try{
      const user= await User.findOne({emailId});
      if(!user){
        throw new Error("invalid credentials");
      }
      const isValidPassword=await user.validatePassword(password);
      if(!isValidPassword){   
        throw new Error("Invalid credentials");
      }
      const token=await user.getJWT(); 
      res.cookie("token",token);
      res.json({
        message:"User loggedIn successfully",
        data:user
      }); 
  }
  catch(err){
      res.status(400).send("Invalid credentials"+err)
  }       

})
app.get("/users",async(req,res)=>{
  try{const users= await User.find();
  res.status(200).json({
    message:"success",
    data:users
  })}
  catch(e){
    console.log("error",e);
    res.status(400),json({
      message:"falied to fetch"
    })
  }
})
app.post("/data",userAuth,async(req,res)=>{
   const recv = req.body;
   let data=recv.code || ""; 
   const prompt = `${PROMPT} ${data}`;
   // data+="generate the summary of this code with #100days of code heading in about 30-40 words just like everyone post on x/linkeding";
   console.log(prompt);
    const summary = await getResponse(prompt);
    console.log(summary)       
    res.status(200).json({
        message:"success",
        summary:"Summary generated"   
    });     
})  


