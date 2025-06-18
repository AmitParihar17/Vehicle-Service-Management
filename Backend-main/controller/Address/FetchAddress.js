const Address = require("../../models/addres.model");
const FetchAddress = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const address = await Address.find({ userId });
    return res.status(200).json({
      success: true,
      message: "Address Fetched",
      address,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = { FetchAddress };
