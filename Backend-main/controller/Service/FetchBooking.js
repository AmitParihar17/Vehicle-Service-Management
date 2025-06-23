const Booking = require("../../models/BookingService.model");
const FetchBooking = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("selectedServices");
    if(!bookings){
        return res.status(400).json({
            success:false,
            message:"booking bot found"
        })
    }
    return res.status(200).json({
      success: true,
      message: "fetched",
      bookings,
    });
  } catch (error) {}
};
module.exports = { FetchBooking };
