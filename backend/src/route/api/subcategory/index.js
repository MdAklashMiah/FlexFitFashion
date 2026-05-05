const express = require("express");
const {
  addSubCategoryController,
  deleteSubCategoryController,
  updateSubCategoryController,
  allSubCategoryController,
} = require("../../../controller/subCategoryController");

const router = express.Router();

router.post("/addsubcategory", addSubCategoryController);
router.delete("/deletesubcategory/:id", deleteSubCategoryController);
router.patch("/updatesubcategory/:id", updateSubCategoryController);
router.get("/allsubcategory" , allSubCategoryController)

module.exports = router;
