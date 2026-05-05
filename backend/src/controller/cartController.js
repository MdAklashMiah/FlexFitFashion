const cartModel = require("../model/cart.model");
const productModel = require("../model/product.model");

/* ================= ADD TO CART ================= */
const addtoCartController = async (req, res) => {
  try {
    const { user, product, variants, quantity } = req.body;

    const productInfo = await productModel.findById(product);
    if (!productInfo) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const totalPrice = productInfo.discountprice * quantity;

    const cartData = {
      user,
      product,
      quantity,
      totalPrice,
    };

    const hasVariants = productInfo.variants && productInfo.variants.length > 0;

    if (productInfo.variantType === "multiVariant") {
      if (hasVariants && !variants) {
        return res.status(400).json({
          success: false,
          message: "Please select size and color",
        });
      }
      if (!hasVariants && productInfo.stock <= 0) {
        return res.status(400).json({
          success: false,
          message: "Product is out of stock",
        });
      }
      cartData.variants = variants;
    } else if (productInfo.variantType === "singleVariant" && hasVariants) {
      // Auto-assign the first variant if it's a single variant product
      cartData.variants = variants || productInfo.variants[0];
    }

    const cart = await cartModel.create(cartData);

    res.status(201).json({
      success: true,
      message: "Cart added successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/* ================= ALL CART ================= */
const allCartController = async (req, res) => {
  try {
    const carts = await cartModel
      .find({})
      .populate("user", "name email")
      .populate("product", "title images price discountprice variantType")
      .populate("variants", "size color");

    res.status(200).json({
      success: true,
      data: carts,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= USER CART ================= */
const singleUserCartController = async (req, res) => {
  try {
    const { id } = req.params;

    const cartlist = await cartModel
      .find({ user: id })
      .populate("product", "title images price discountprice")
      .populate("variants", "size color");

    res.status(200).json({
      success: true,
      data: cartlist,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= UPDATE QTY ================= */
const updateQuantityController = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ success: false, message: "Invalid quantity" });
    }

    const cartItem = await cartModel.findById(id).populate("product");
    if (!cartItem) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    cartItem.totalPrice = cartItem.product.discountprice * quantity;

    await cartItem.save();

    res.status(200).json({
      success: true,
      message: "Quantity updated",
      data: cartItem,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= DELETE ITEM ================= */
const deleteCartItemController = async (req, res) => {
  try {
    const { id } = req.params;

    const cartItem = await cartModel.findByIdAndDelete(id);
    if (!cartItem) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  addtoCartController,
  allCartController,
  singleUserCartController,
  updateQuantityController,
  deleteCartItemController,
};
