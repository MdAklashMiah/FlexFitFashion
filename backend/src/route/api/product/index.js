const express = require("express");
const { createProductController, allProductController, latestProductController, deleteProductController, updateProductController, singleProductController } = require("../../../controller/productController");
const upload = require("../../../utils/upload");

const { authCheckMiddleware, adminCheckMiddleware } = require("../../../utils/authCheckMiddleware");

const router = express.Router();


router.post("/createproduct", authCheckMiddleware, adminCheckMiddleware, upload.array("product"), createProductController)

router.get("/allproducts", allProductController)

router.get("/latestproduct" , latestProductController)

router.patch("/updateproduct/:id", authCheckMiddleware, adminCheckMiddleware, upload.array("product"), updateProductController)

router.delete("/deleteproduct/:id", authCheckMiddleware, adminCheckMiddleware, deleteProductController)

router.get("/product/:slug", singleProductController)


module.exports = router;
