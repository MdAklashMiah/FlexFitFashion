const express = require("express");
const {
  signupController,
  verifyOtpController,
  loginController,
  allusersController,
  verifyUserController,
} = require("../../../controller/authController");
const { authCheckMiddleware, adminCheckMiddleware } = require("../../../utils/authCheckMiddleware");
const router = express.Router();

router.post("/signup", signupController);

router.post("/verify-otp", verifyOtpController);

router.post("/login", loginController);

router.get("/allusers", authCheckMiddleware , adminCheckMiddleware, allusersController);

router.get("/verifyuser", verifyUserController)

module.exports = router;
