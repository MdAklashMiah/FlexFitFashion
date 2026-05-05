const express = require("express");
const {
  addtoCartController,
  allCartController,
  singleUserCartController,
  updateQuantityController,
  deleteCartItemController,
} = require("../../../controller/cartController");

const router = express.Router();

router.post("/addtocart", addtoCartController);
router.get("/allcart", allCartController);
router.get("/usercart/:id", singleUserCartController);
router.put("/update/:id", updateQuantityController);
router.delete("/delete/:id", deleteCartItemController);

module.exports = router;
