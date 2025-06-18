const router=require("express").Router();
const contactRoute = require("../../routes/api/contact.route")
const authRoutes=require("./auth.route")
const uploadFile=require('./upload.route')
const Product = require("./Product.route")
const address = require("./address.route");
const orderRouter = require("./Order.route");
const serviceRouter = require("./Service.router");
router.use("/auth",authRoutes)
router.use('/uploadFile',uploadFile)
router.use("/contact",contactRoute);
router.use("/product",Product)
router.use("/Address",address)
router.use("/order",orderRouter)
router.use("/service",serviceRouter)

router.get("/ping",(req,res)=>{
    res.json({success:"true",message:"successful request"})
  
})

module.exports=router