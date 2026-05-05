const express = require("express");
const {
  addbannerController,
  deleteBannerController,
  updateBannerController,
  allbannersController,
} = require("../../../controller/bannerController");
const router = express.Router();
const { adminCheckMiddleware, authCheckMiddleware } = require("../../../utils/authCheckMiddleware");
const upload = require("../../../utils/upload");


//Add Banner
router.post("/addbanner",authCheckMiddleware, adminCheckMiddleware, upload.single("banner"), addbannerController);
//Delete Banner
router.delete("/deletebanner/:id", authCheckMiddleware, adminCheckMiddleware , deleteBannerController);
//Update Banner
router.patch("/updatebanner/:id", upload.single("banner"), updateBannerController)
//get all banners
router.get("/allbanners", allbannersController)


module.exports = router;
