
// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const User = require("../../Models/user.model");
// const { loginValidation } = require("../../services/validation_schema");
// const bcrypt = require("bcrypt");
// const login = async (req, res, next) => {
//   try {
//     const loginResponse = await loginValidation.validateAsync(req.body);
//     const { email, password } = loginResponse;

//     const existingUser = await User.findOne({ email });

//     if (!existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid Email Address. Please register.",
//       });
//     }

//     const passwordMatching = await bcrypt.compare(
//       password,
//       existingUser.password
//     );

//     if (!passwordMatching) {
//       return res.status(400).json({
//         success: false,
//         message: "Incorrect Password. Please try again.",
//       });
//     }

//     const token = jwt.sign(
//       {
//         id: existingUser._id,
//         email: existingUser.email,
//         role: existingUser.role,
//       },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: "1h" }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Login successful 🎉",
//       token,
//       user: {
//         username: existingUser.username,
//         email: existingUser.email,
//         role: existingUser.role,
//       },
//       redirectTo: "/",
//     });
//   } catch (error) {
//     console.error("🔥 Login Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

// module.exports = login;



require("dotenv").config();
const User = require("../../models/User.model");
const { loginValidation } = require("../../services/validation_schema");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../middlewares/checkAuth"); // Import generateToken function

const login = async (req, res, next) => {
  try {
    // Validate login request data
    const loginResponse = await loginValidation.validateAsync(req.body);
    const { email, password, role } = loginResponse;

    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email Address. Please register.",
      });
    }

    // Compare passwords
    const passwordMatching = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordMatching) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password. Please try again.",
      });
    }

    // Check for role mismatch
    if (existingUser.role !== role) {
      return res.status(403).json({
        success: false,
        message: `Access denied for role: ${role}`,
      });
    }

    // Prepare payload and generate token using generateToken function
    const payload = {
      id:existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      role: existingUser.role, // Include role in the payload
    };

    const token = generateToken(payload); // Using generateToken here instead of jwt.sign()
    // Respond with success and the generated token
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id:existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        role: existingUser.role,
      },
      token: token, // Returning the generated token
    });
  } catch (error) {
    console.error("Error during login:", error);
    next(error);
  }
};

module.exports = login;
