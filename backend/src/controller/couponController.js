const couponModel = require("../model/coupon.model");

let createCouponController = async (req, res) => {
  try {
    let { code, amount, minPrice, dateExpiry } = req.body;

    if (!code || !amount || !minPrice || !dateExpiry) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    code = code.toUpperCase();

    const existingCoupon = await couponModel.findOne({ code });
    if (existingCoupon) {
      return res.status(409).json({
        success: false,
        message: "Coupon code already exists",
      });
    }

    const expiryDate = new Date(dateExpiry);
    if (isNaN(expiryDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid expiry date",
      });
    }

    let coupon = new couponModel({
      amount,
      code,
      minPrice,
      dateExpiry: expiryDate
    });

    await coupon.save();

    return res
      .status(201)
      .json({
        success: true,
        message: "Coupon Created Successfully",
        data: coupon,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createCouponController,
};
