const express = require("express")
const { addVariantController } = require("../../../controller/variantController")

const router = express.Router()

router.post("/addvariant" , addVariantController)


module.exports = router