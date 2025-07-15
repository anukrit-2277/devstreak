const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config()
const geminiApiKey = process.env.GEMINI_KEY;
const getResponse = async (prompt, systemInstruction = "only stationary related queries") => {
  try {
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction
    });
    const result = await model.generateContent(prompt);
    return result.response.text();

  } catch (e) {
    return {
      message: "Invalid",
      error: e
    };
  }
};

module.exports=getResponse