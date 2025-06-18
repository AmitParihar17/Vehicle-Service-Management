const  router = require("express").Router()
const { contact } = require("../../controller/contact_us/contact");

router.post("/contact_us",contact)

module.exports  = router;