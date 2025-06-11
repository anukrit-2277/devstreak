const mongoose=require("mongoose")

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photoURL: { type: String },
  password: { type: String }, 

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
module.exports=mongoose.model("User",userSchema);