const express = require("express")
const { createCouponController } = require("../../../controller/couponController")

const router = express.Router()

router.post("/createcoupon", createCouponController)



module.exports = router