 
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
// Define schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

// Virtual field for confirmPassword
userSchema
  .virtual("confirmPassword")
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

// Password confirmation validation before save
userSchema.pre("save", function (next) {
  if (this.password !== this._confirmPassword) {
    this.invalidate("confirmPassword", "Passwords must match");
  }
  next();
});

// module.exports = model("User", userSchema, "users_data");
module.exports = mongoose.models.User || mongoose.model("User", userSchema, "users_data");

  
