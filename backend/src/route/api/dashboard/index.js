const express = require("express");
const { getDashboardStats } = require("../../../controller/dashboardController");
const { authCheckMiddleware, adminCheckMiddleware } = require("../../../utils/authCheckMiddleware");
const router = express.Router();

router.get("/stats", authCheckMiddleware, adminCheckMiddleware, getDashboardStats);

module.exports = router;
