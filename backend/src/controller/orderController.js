const cartModel = require("../model/cart.model");
const orderModel = require("../model/order.model");
// SSL setup...
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = process.env.SSL_STORE_ID;
const store_passwd = process.env.SSL_STORE_PASSWORD;
const is_live = false; //true for live, false for sandbox

let createOrderController = async (req, res) => {
  try {
    let { user, phone, address, city, discount, paymentMethod, orderStatus } =
      req.body;

    let cartlist = await cartModel.find({ user });

    if (cartlist.length == 0) {
      return res
        .status(404)
        .json({ success: false, message: "Cart is empty, Please add to cart" });
    } else {
      if (paymentMethod == "cod") {
        let totalPrice = cartlist.reduce((prev, cur) => {
          return prev + cur.totalPrice;
        }, 0);

        let order = new orderModel({
          user,
          phone,
          address,
          city,
          discount,
          paymentMethod,
          orderStatus,
          items: cartlist,
          totalPrice,
        });

        await order.save();

        let deletecart = await cartModel.deleteMany({ user });

        return res.status(201).json({
          success: true,
          message: "Order Placed Successfully",
          data: order,
        });
      } else {
        // online payment
        let totalPrice = cartlist.reduce((prev, cur) => {
          return prev + cur.totalPrice;
        }, 0);
        let tran_id = `Trnx${Date.now()}`;

        let order = new orderModel({
          user,
          phone,
          address,
          city,
          discount,
          paymentMethod,
          orderStatus,
          items: cartlist,
          totalPrice,
          trans_id: tran_id,
        });

        await order.save();

        let deletecart = await cartModel.deleteMany({ user });

        const data = {
          total_amount: totalPrice,
          currency: "BDT",
          tran_id: tran_id,
          success_url: `${process.env.SERVER_URL}${process.env.BASE_URL}/order/success/${tran_id}`,
          fail_url: `${process.env.SERVER_URL}${process.env.BASE_URL}/order/fail/${tran_id}`,
          cancel_url: `${process.env.SERVER_URL}${process.env.BASE_URL}/order/cancel/${tran_id}`,
          ipn_url: `${process.env.SERVER_URL}${process.env.BASE_URL}/order/ipn`,
          shipping_method: "Courier",
          product_name: "Items from Order",
          product_category: "General",
          product_profile: "general",
          cus_name: user, // Should ideally be user name
          cus_email: "customer@example.com",
          cus_add1: address,
          cus_city: city,
          cus_country: "Bangladesh",
          cus_phone: phone,
          ship_name: user,
          ship_add1: address,
          ship_city: city,
          ship_country: "Bangladesh",
        };
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        sslcz.init(data).then((apiResponse) => {
          let GatewayPageURL = apiResponse.GatewayPageURL;
          if (GatewayPageURL) {
            return res.status(200).json({ success: true, url: GatewayPageURL });
          } else {
            return res.status(400).json({ success: false, message: "SSLCommerz session failed" });
          }
        }).catch((err) => {
          return res.status(500).json({ success: false, message: "Payment gateway error", error: err.message });
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

let allOrderController = async (req, res) => {
  try {
    let orderlist = await orderModel.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      data: orderlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

let userOrderController = async (req, res) => {
  try {
    let { id } = req.params;
    let orderlist = await orderModel.find({ user: id }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "User orders fetched successfully",
      data: orderlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

let successOrderController = async (req, res) => {
  try {
    let { id } = req.params;

    let val_id = req.body.val_id;

    if (!val_id) {
       return res.status(400).json({success: false, message: "Invalid transaction"});
    }

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.validate({ val_id: val_id }).then(async (data) => {
      if (data.status === 'VALID' || data.status === 'VALIDATED') {
        let order = await orderModel.findOneAndUpdate(
          { trans_id: id },
          { paymentStatus: "paid" },
          { new: true }
        );
        const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
        res.redirect(`${clientUrl}/cart?success=true&trans_id=${id}`);
      } else {
        const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
        res.redirect(`${clientUrl}/cart?success=false`);
      }
    }).catch(err => {
      const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
      res.redirect(`${clientUrl}/cart?success=false`);
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

let failOrderController = async (req, res) => {
  try {
    let { id } = req.params;

    let order = await orderModel.findOneAndUpdate(
      {trans_id: id},
      { paymentStatus: "failed" },
      { new: true }
    );

    const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
    res.redirect(`${clientUrl}/cart?success=false`);
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

let updateOrderStatusController = async (req, res) => {
  try {
    let { id } = req.params;
    let { orderStatus } = req.body;

    let order = await orderModel.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

let deleteOrderController = async (req, res) => {
  try {
    let { id } = req.params;
    await orderModel.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createOrderController,
  allOrderController,
  userOrderController,
  successOrderController,
  failOrderController,
  updateOrderStatusController,
  deleteOrderController,
};
