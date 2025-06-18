const Order = require("../../models/Order");
const userModel = require("../../models/user.model");

const CreateOrder = async (req,res)=>{
    try{
         const {
           paymentOption,
           productId,
           productName,
           category,
           offerPrice,
           address,
         } = req.body;
        const userId = req.user?.id
        console.log(req.body)
        const user = await userModel.findById(userId)
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        const order = await Order.create({
            user:user._id,
            paymentOption,
            productId,
            productName,
            category,
            offerPrice,
            address,
        })
        return res.status(200).json({
            success:true,
            message:"Order Placed Successfully",
            order
        })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}
module.exports = CreateOrder