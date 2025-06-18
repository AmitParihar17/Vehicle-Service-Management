const express = require("express")
const router = express.Router()
const {AllProducts} = require("../../controller/Product/AllProduct")
router.get("/allproducts",AllProducts)
module.exports = router
