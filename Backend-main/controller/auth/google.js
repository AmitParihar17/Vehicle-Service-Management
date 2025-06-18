require("dotenv").config();
const jwt = require("jsonwebtoken");
const { oauth2Client } = require("../../utils/googleClient");
const GoogleUser = require("../../models/google.model");
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log(
  "GOOGLE_CLIENT_SECRET:",
  process.env.GOOGLE_CLIENT_SECRET ? "Loaded" : "Missing"
);

const googleRegister = async (req, res) => {
  console.log("Google Register called with body:", req.body);

  try {
    const { code, role = "user" } = req.body;
    console.log("Received code:", code);
    console.log("User role:", role);

    if (!code) {
      console.log("No authorization code provided");
      return res
        .status(400)
        .json({ message: "Authorization code is required" });
    }

    const { tokens } = await oauth2Client.getToken(code);
    console.log("Tokens received from Google:", tokens);

    if (!tokens.id_token || !tokens.access_token) {
      console.log("Missing id_token or access_token");
      return res.status(400).json({ message: "Failed to obtain access token" });
    }

    const ticket = await oauth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log("Verified ID Token ticket:", ticket);

    const payload = ticket.getPayload();
    console.log("Payload from ID Token:", payload);

    const { sub: googleId, email, name, picture } = payload;

    if (!email) {
      console.log("Email not found in Google account");
      return res
        .status(400)
        .json({ message: "Email not found in Google account" });
    }

    let user = await GoogleUser.findOne({ email });
    console.log("Existing user found:", user);

    let isNewUser = false;

    if (!user) {
      user = await GoogleUser.create({
        name,
        email,
        image: picture,
        googleId,
        role,
      });
      console.log("Created new user:", user);
      isNewUser = true;
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    console.log("JWT generated for user:", token);

    res.status(200).json({
      message: "Google SignIn successful",
      isNewUser,
      user: {
        email,
        name,
        image: picture,
        token,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(
      "Google SignUp Error:",
      err.response?.data || err.message || err
    );
    res.status(500).json({
      message: "Internal Server Error",
      error: err.response?.data || err.message,
    });
  }
};
  

module.exports = googleRegister;
