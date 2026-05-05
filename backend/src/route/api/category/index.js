const express = require("express");
const { addCategoryController, deleteCategoryController, updateCategoryController, allCategoryController } = require("../../../controller/categoryController");
const upload = require("../../../utils/upload");
const { authCheckMiddleware, adminCheckMiddleware } = require("../../../utils/authCheckMiddleware");
const router = express.Router();

//add category
router.post("/addcategory", authCheckMiddleware, adminCheckMiddleware, upload.single("category"), addCategoryController)

//delete category
router.delete("/deletecategory/:id", authCheckMiddleware, adminCheckMiddleware, deleteCategoryController)

//
router.put("/updatecategory/:id" , authCheckMiddleware, adminCheckMiddleware, upload.single("category"),  updateCategoryController)

// fetch all category
router.get("/allcategory", allCategoryController)

module.exports = router;
