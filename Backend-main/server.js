 

// mongo connection (First step)
const mongoose = require("mongoose");
const chalk = require("chalk");
const routes = require("./routes/index");
const cors=require("cors")
const express = require("express");
const backend = express();
const path = require("path")
const createDefaultAdmin = require("./controller/auth/defaultadmin");

// routing 3
backend.use(express.json()); 



// CORS (Second step) 2
backend.use(cors({
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  })
) 
backend.use(routes)
backend.use("/uploads", express.static(path.join(__dirname, "middlewares/uploads")));
// mongoose connect 1
 mongoose
   .connect(
     "mongodb+srv://amitparihar1208:rrNVw37MzGMWql6Z@backend-pi.72g5s.mongodb.net/"
   )
   .then(async() => {
     console.log(`${chalk.green("✓")} ${chalk.blue("MongoDB Connected!")}`);

     // Create default admin here
     await createDefaultAdmin();

     // Start server
     const PORT = 5001;
     backend.listen(PORT, () => {
       console.log(
         `${chalk.green("✓")} ${chalk.blue(
           "Server Started on port"
         )} ${chalk.bgMagenta.white(PORT)}`
       );
     });
   })
   .catch((err) => console.log(err));




