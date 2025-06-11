const express= require("express")
const connectDB=require("./config/database");
const PROMPT=require("./constants/prompt")
const app=express()
const getResponse=require("./services/getResponse")
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
app.use(express.json())
app.post("/data",async(req,res)=>{
   const recv = req.body;
   let data=recv.code || ""; 
   const prompt = `${PROMPT} ${data}`;
   // data+="generate the summary of this code with #100days of code heading in about 30-40 words just like everyone post on x/linkeding";
   //console.log(prompt);
    const summary = await getResponse(prompt);
    console.log(summary)       
    res.status(200).json({
        msg:"success",
        summary:"Summary generated"   
    });     
})  


