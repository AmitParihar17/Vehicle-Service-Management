const express = require("express")
const addressrouter = express.Router()

const {checkAuth} = require("../../middlewares/checkAuth.js")
const { UserAddress } = require("../../controller/Address/Addres.js")
const { FetchAddress } = require("../../controller/Address/FetchAddress.js");
addressrouter.post("/address", UserAddress);
addressrouter.get("/getaddress", FetchAddress);
module.exports = addressrouter