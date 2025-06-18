const { upload } = require("../../middlewares/multer")
const serviceModel = require("../../models/service.model")

const UploadService = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const {
      serviceName,
      serviceDescription,
      servicePrice,
      approxTime,
      contact,
    } = req.body;

    const imgurl = req.files.map((file) => ({
      url: `uploads/${file.filename}`,
    }));

    const service = await serviceModel.create({
      serviceName,
      serviceDescription,
      servicePrice,
      approxTime,
      contact,
      images: imgurl,
    });

    return res.status(200).json({
      success: true,
      message: "Service uploaded successfully",
      service,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {UploadService}