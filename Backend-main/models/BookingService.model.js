const {model,Schema}= require("mongoose")
const ServiceBookingSchema = new Schema(
  {
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
    selectedServices: {
      type: Array,
      ref: "Service",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending","approved"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("ServiceBookingSchema", ServiceBookingSchema);