const Service = require("../../models/service.model.js")
const services = async (req,res) =>{
    try {
       const services = await Service.find()
       console.log(services)
       return res.status(200).json({
         success:true,
         message:"service fetched",
         services
       })
    } catch (err) {
       return res.status(400).json({
        success:false,
        err:err.message
       })
    }
}
module.exports = services