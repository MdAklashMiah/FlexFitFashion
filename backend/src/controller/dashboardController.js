const productModel = require("../model/product.model");
const orderModel = require("../model/order.model");
const userModel = require("../model/signup.model");
const categoryModel = require("../model/category.model");

const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await productModel.countDocuments();
    const totalOrders = await orderModel.countDocuments();
    const totalUsers = await userModel.countDocuments({ role: "user" });
    const totalCategories = await categoryModel.countDocuments();

    const orders = await orderModel.find();
    const totalRevenue = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);

    const recentOrders = await orderModel.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
        totalUsers,
        totalCategories,
        totalRevenue,
        recentOrders
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

module.exports = { getDashboardStats };
