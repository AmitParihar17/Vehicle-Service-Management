const Order = require("../../models/Order")
const userModel = require("../../models/user.model")

const GetOrders = async(req,res)=>{
    try{
        const userId = await req.user.id
        console.log(userId)
        const user = await userModel.findById(userId)
        const orders = await Order.find({user:userId}).populate("user").populate("productId")
        return res.status(200).json({
            success:true,
            orders
        })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}
module.exports = GetOrders