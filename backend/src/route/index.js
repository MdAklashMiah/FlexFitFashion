const express = require("express")
const router = express.Router()
const api = require("./api")

const baseUrl = process.env.BASE_URL || "/api/v1";
router.use(baseUrl, api);

module.exports = router;