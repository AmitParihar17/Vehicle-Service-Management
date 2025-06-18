const router = require("express").Router();
const upload = require("../../controller/upload/upload.js");

router.post("/upload", upload);

module.exports = router;
