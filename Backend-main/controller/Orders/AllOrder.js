const Order = require("../../models/Order.js")
const AllOrders = async (req,res)=>{
      try {
        const admin = req.user.id
        console.log(admin)
        if(!admin){
            return res.status(400).json({
                success:false,
                message:"Admin not found"
            })
        }
        const orders = await Order.find()
        return res.status(200).json({
            success:true,
            message:"All orders fetched",
            orders
        })
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
}
module.exports = {AllOrders}