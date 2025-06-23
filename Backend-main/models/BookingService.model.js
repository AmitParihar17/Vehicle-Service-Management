const { model, Schema, Types } = require("mongoose");
const ServiceBookingSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    selectedServices: [
      {
        type:Types.ObjectId,
        ref: "Service",
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
      required: true,
    },
    totalPrice:{
      type:Number,
      required:true
    },
  },
  { timestamps: true }
);
module.exports = model("ServiceBookingSchema", ServiceBookingSchema);