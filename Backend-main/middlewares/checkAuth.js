 
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.ACCESS_TOKEN_SECRET;

const checkAuth = (req, res, next) => {
  const authorization = req.headers.authorization;

  // Check if the Authorization header exists
  if (!authorization) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  // Ensure the header starts with 'Bearer '
  if (!authorization.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({
        message: "Authorization header must be in the format: Bearer <token>",
      });
  }

  // Extract token from header
  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Attach user data to the request object
    console.log("Decoded token:", decoded);
    next();
  } catch (error) {
    // Log error only in development for security
    if (process.env.NODE_ENV === "development") {
      console.log("JWT Verification Error:", error.message);
    }

    // Handle different JWT errors
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token has expired, please login again" });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ message: "Invalid token, please provide a valid token" });
    } else {
      return res
        .status(500)
        .json({ message: "Authentication failed", error: error.message });
    }
  }
};

const generateToken = (userData) => {
  return jwt.sign(userData, secretKey, { expiresIn: "1h" });
};

module.exports = { checkAuth, generateToken };
