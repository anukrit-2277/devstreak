const validator=require("validator");
const validateSignUpData=(req)=>{
   const {firstName,lastName,emailId,password}=req.body;

   if(!firstName.length || !lastName.length){
        throw new Error("name not valid")
   }
   else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
   }
   else if(!validator.isStrongPassword(password)){
        throw new Error("Enter strong password");
   }
}
module.exports={    
    validateSignUpData
};