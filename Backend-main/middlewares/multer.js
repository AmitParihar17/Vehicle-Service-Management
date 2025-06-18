// const multer = require('multer');
// const path = require('path');
// const fs = require('fs')
//   //multer store configuration
//   const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//       // Specify the folder to save uploaded files
//       const uploadFolder = path.join(__dirname, '../uploads');
//       // Create the upload folder if it doesn't exist
//       if(!fs.existsSync(uploadFolder)){
//             fs.mkdirSync(uploadFolder);
//       }
//       cb(null,uploadFolder)
//     },
//         filename:(req,file,cb)=>{
//             //unique filename
//              cb(null, Date.now() + path.extname(file.originalname));
//         },
//   });

//   const upload = multer({
//     storage: storage,
//     limits: { fileSize: 10 * 1024 * 1024 }, //  Maximum file size of 10MB
//     fileFilter:(req,file,cb)=>{
//       // Allowed file types (e.g., only images)
//         const filetypes = /jpeg|jpg|png|gif/;
//         const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//         const mimetype = filetypes.test(file.mimetype);

//         if(extname && mimetype){
//             return cb(null,true)
//         } 
//         else{
//                 cb(
//                   new Error(
//                     "Invalid file type. Only JPEG, JPG, PNG, GIF files are allowed."
//                   )
//                 );
//         }
//     }
//   }).single('file'); // Accept only a single file in the 'file' field

//   module.exports= {upload}
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadfolder = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadfolder)) {
      fs.mkdirSync(uploadfolder);
    }

    cb(null, uploadfolder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|jfif|png|gif|webp|mp4|webm|ogg|avif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Invalid type"));
    }
  },
}).array("files", 10);
module.exports = { upload, storage };