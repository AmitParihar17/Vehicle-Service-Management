const serviceRouter = require("express").Router();

const BookService = require("../../controller/Service/BookService");
const { UploadService } = require("../../controller/Service/UploadService");
const services = require("../../controller/Services/Services");
const { checkAuth } = require("../../middlewares/checkAuth");
const { upload } = require("../../middlewares/multer");

serviceRouter.post("/upload", checkAuth,upload, UploadService);
serviceRouter.get("/all", services);
serviceRouter.post("/book",checkAuth,BookService)

module.exports = serviceRouter;
