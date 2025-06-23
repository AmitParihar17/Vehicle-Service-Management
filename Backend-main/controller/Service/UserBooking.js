const BookingServiceModel = require("../../models/BookingService.model")

const UserBooking = async (req,res)=>{
    try {
        const userId = req.user.id
        const service = await BookingServiceModel.find({
          user: userId,
        }).populate("selectedServices");
        return res.status(200).json({
            success:true,
            messsage:"fetched",
            service
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
module.exports = {UserBooking}