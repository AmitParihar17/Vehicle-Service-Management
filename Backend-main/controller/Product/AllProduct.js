const Products = require("../../models/Products")

const AllProducts = async (req, res, next) => {
  try {
    const product = await Products.find();
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product fetched sucessfully",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {AllProducts}