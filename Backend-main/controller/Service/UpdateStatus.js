const BookingServiceModel = require("../../models/BookingService.model")

const UpdateStatus = async(req,res)=>{
    try {
        const {status}=req.body
        const {id} = req.params
        console.log(id,status)
        const updateBooking = await BookingServiceModel.findByIdAndUpdate(id,
            {status:status},
            {new:true})
        return res.status(200).json({
          success: true,
          message: "Service confirmed",
          updateBooking,
        });
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
module.exports = {UpdateStatus}