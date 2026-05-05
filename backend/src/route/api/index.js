const express = require("express");
const router = express.Router();
const auth = require("./auth");
const banner = require("./banner");
const category = require("./category");
const subcategory = require("./subcategory");
const product = require("./product")
const variant = require("./variant")
const coupon = require("./coupon")
const cart = require("./cart")
const order = require("./order")
const dashboard = require("./dashboard")

router.use("/auth", auth);
router.use("/banner", banner);
router.use("/category", category);
router.use("/subcategory", subcategory);
router.use("/product", product)
router.use("/variant" , variant)
router.use("/coupon", coupon)
router.use("/cart", cart)
router.use("/order", order)
router.use("/dashboard", dashboard)

module.exports = router;
