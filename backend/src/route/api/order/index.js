const express = require("express")
const { createOrderController, allOrderController, userOrderController, successOrderController, failOrderController, updateOrderStatusController, deleteOrderController } = require("../../../controller/orderController")
const { authCheckMiddleware, adminCheckMiddleware } = require("../../../utils/authCheckMiddleware");
const router = express.Router()

router.post("/create", createOrderController)

router.get("/allorder", authCheckMiddleware, adminCheckMiddleware, allOrderController)

router.get("/userorder/:id", authCheckMiddleware, userOrderController)

router.patch("/updateorder/:id", authCheckMiddleware, adminCheckMiddleware, updateOrderStatusController)

router.delete("/deleteorder/:id", authCheckMiddleware, adminCheckMiddleware, deleteOrderController)

router.post("/success/:id", successOrderController)

router.post("/fail/:id", failOrderController)


module.exports = router