 const User = require("../../models/User.model");
const bcrypt = require("bcryptjs");
const createDefaultAdmin = async () => {
  const existingAdmin = await User.findOne({ role: "admin" });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const newAdmin = new User({
      username: "admin",
      email: "admin@example.com",
      number: "12121212",
      password: hashedPassword,
      role: "admin",
    });
    await newAdmin.save();
    console.log("Default admin created");
  }
};
module.exports = createDefaultAdmin;



