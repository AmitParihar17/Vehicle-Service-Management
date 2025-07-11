const { Schema, model } = require("mongoose");
const Address = new Schema({
  userId: {
    required: true,
    type: String,
  },
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  street: {
    required: true,
    type: String,
  },
  city: {
    required: true,
    type: String,
  },
  state: {
    required: true,
    type: String,
  },
  pincode: {
    required: true,
    type: Number,
  },
  country: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: Number,
  },
});
module.exports = model("UserAddress", Address);
