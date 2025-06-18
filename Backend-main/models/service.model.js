const { model, Shcema, Schema } = require("mongoose");
const ServiceSchema = new Schema(
  {
    serviceName: {
      type: String,
      required: true,
    },
    serviceDescription: {
      type: String,
      required: true,
    },
    servicePrice: {
      type: Number,
      required: true,
    },
    approxTime: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("Service", ServiceSchema);
