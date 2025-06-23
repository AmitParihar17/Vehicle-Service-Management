const BookingServiceModel = require("../../models/BookingService.model.js")
const serviceModel = require("../../models/service.model.js")
const User = require("../../models/user.model.js")
const BookService = async (req,res)=>{
    try {
         const { name, phone, date, time, selectedServices} = req.body
         const userId = req.user.id
         console.log(userId)
         const user = await User.findById(userId)
         if(!user){
         return res.status(400).json({
            success:false,
            message:"User not found"
        })
        }
        const serviceDetails = await serviceModel.find({
          _id: { $in: selectedServices },
        });
        const totalPrice = serviceDetails.reduce(
          (sum, service) => sum + (service.servicePrice || 0),
          0
        );
        const booking = await BookingServiceModel.create({
          user:userId,
          name,
          phone,
          date,
          time,
          selectedServices,
          totalPrice,
        });
        return res.status(200).json({
            success:true,
            message:"You have successfully booked a service",
            booking
        }) 
    } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
    }
}
module.exports = BookService