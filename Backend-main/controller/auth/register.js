 const User = require("../../models/User.model");
 const { registrationValidation } = require("../../services/validation_schema");
 const bcrypt = require("bcrypt");
 const register = async (req, res, next) => {
   try {
     const registerValues = await registrationValidation.validateAsync(
       req.body
     );
     console.log(registerValues);
     console.log("Incoming Request Body:",req.body);
     
     const { username, password ,email,confirmPassword,role} = registerValues;
     const userVerification = await User.findOne({
       username,
     });
     const userPassword = await User.findOne({
       password,
     });
       const userEmail = await User.findOne({
         email,
       });

     console.log(userVerification);
     if (userVerification) {
       return res.status(400).json({
         success: false,
         message: "User Exist already",
       });
     }
     if (userPassword) {
       return res.status(409).json({
         success: false,
         message: "User Password exists",
       });
     }
         if (userEmail) {
           return res.status(200).json({
             success: false,
             message: "User Exist already",
           });
         }

         if(password !== confirmPassword){
          return res.status(400).json({
            success:false,
            message:"password do not match"
          })
         }
   const hashedPassword=await bcrypt.hash(password,5)
     const newUser = new User({
       username,
       password:hashedPassword,
       email,
       role,
     });
     await newUser.save();
     
const payload={
  id:newUser._id,
  username:newUser.username,
  email:newUser.email,
  role:newUser.role
}
     res.status(200).json({
       success: true,
       message: "User registered successfully",
       payload
     });
   } catch (error) {
     next(error);
   }
 };

 module.exports = register;


 

 



 

 