const orderRouter = require("express").Router();
const { AllOrders } = require("../../controller/Orders/AllOrder");
const GetOrders = require("../../controller/Orders/GetOrder");
const CreateOrder = require("../../controller/Orders/Order");
const { UpdateStatus } = require("../../controller/Orders/UpdateAtatus");
const { checkAuth } = require("../../middlewares/checkAuth");

orderRouter.post("/order", checkAuth, CreateOrder);
orderRouter.get("/myorders",checkAuth,GetOrders)
orderRouter.get("/allorders",checkAuth,AllOrders)
orderRouter.put("/update/:id",checkAuth,UpdateStatus)
module.exports = orderRouter;
