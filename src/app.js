const { GoogleGenerativeAI } = require("@google/generative-ai");
const express= require("express")
const app=express()
const PORT=8112
require('dotenv').config()
const geminiApiKey = process.env.GEMINI_KEY;


app.listen(PORT,()=>{
     console.log(`listening on ${PORT} `);
});
app.use(express.json())
app.post("/data",async(req,res)=>{
   const recv = req.body;
   let data=recv.code || ""; 
   const prompt = `
You are a developer participating in #100DaysOfCode. Write a social media post summarizing the following code snippet in a way that is:

1. Human-readable and beginner-friendly.
2. Brief, clear, and motivational.
3. Shows what was built, learned, or implemented.
4. Avoids too much technical jargon.
5. Uses friendly tone and hashtags like #100DaysOfCode, #DevStreak, #DayX, #WebDev, etc.

Here’s the code:
${data}
`;

    data+="generate the summary of this code with #100days of code heading in about 30-40 words just like everyone post on x/linkeding";
    const summary = await getResponse(prompt);
    console.log(summary)  

     
    res.status(200).json({
        msg:"success",
        summary:"Summary generated"   
    });     
})
const getResponse = async (prompt, systemInstruction = "only stationary related queries") => {
  try {
    const genAI = new GoogleGenerativeAI(geminiApiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction
    });

    const result = await model.generateContent(prompt);

    console.log(result.response.text());
    return result.response.text();
  } catch (e) {
    return {
      message: "Invalid",
      error: e
    };
  }
};


