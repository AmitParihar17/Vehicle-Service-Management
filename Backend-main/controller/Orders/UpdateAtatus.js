const Order = require("../../models/Order");

const UpdateStatus = async(req,res)=>{
    try {
        const {id} = req.params;
        const {status} = req.body
        console.log(id,status)
        const update = await Order.findByIdAndUpdate(id,{status:status},{new:true})
        return res.status(200).json({
            success:true,
            message:"Order status updated",
            update
        })
    } catch (error) {
        return res.status(200).json({
            success:false,
            message:error.message
        })
    }
}
module.exports = {UpdateStatus}