 
const express = require("express");
const router = express.Router();
const apiRoutes = require("./api/index");  

router.use("/api", apiRoutes);   

router.get("/", (req, res) => {
  res.send(" Hiii from routes");
  console.log('get request accepted from route');
  
});

module.exports = router;



