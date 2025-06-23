const serviceRouter = require("express").Router();

const BookService = require("../../controller/Service/BookService");
const { FetchBooking } = require("../../controller/Service/FetchBooking");
const { UpdateStatus } = require("../../controller/Service/UpdateStatus");
const { UploadService } = require("../../controller/Service/UploadService");
const { UserBooking } = require("../../controller/Service/UserBooking");
const services = require("../../controller/Services/Services");
const { checkAuth } = require("../../middlewares/checkAuth");
const { upload } = require("../../middlewares/multer");

serviceRouter.post("/upload", checkAuth,upload, UploadService);
serviceRouter.get("/all", services);
serviceRouter.post("/book",checkAuth,BookService)
serviceRouter.get("/user",checkAuth,UserBooking)
serviceRouter.get("/allbookings",checkAuth,FetchBooking)
serviceRouter.put("/updatestatus/:id",checkAuth,UpdateStatus);
module.exports = serviceRouter;
