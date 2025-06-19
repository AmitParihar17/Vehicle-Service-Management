const BookingServiceModel = require("../../models/BookingService.model.js")
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
        const booking = await BookingServiceModel.create({
          name,
          phone,
          date,
          time,
          selectedServices,
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