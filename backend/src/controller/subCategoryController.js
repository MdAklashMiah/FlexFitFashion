let slugify = require("slugify");
const subcategoryModel = require("../model/subcategory.model");
const categoryModel = require("../model/category.model");

let addSubCategoryController = async (req, res) => {
  try {
    let { name, category } = req.body;

    // Validation
    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: "Name and category are required",
      });
    }

    // Check category exists
    let existingCategory = await categoryModel.findById(category);

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Generate slug
    let slug = slugify(name, {
      replacement: "-",
      lower: true,
      trim: true,
    });

    // Create subcategory
    let addsubcategory = new subcategoryModel({
      name,
      slug,
      category,
    });

    // Save subcategory
    await addsubcategory.save();

    // Push subcategory id into category
    await categoryModel.findByIdAndUpdate(category, {
      $push: { subcategory: addsubcategory._id },
    });

    return res.status(201).json({
      success: true,
      message: "Sub category created successfully",
      data: addsubcategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

let deleteSubCategoryController = async (req, res) => {
  try {
    let { id } = req.params;

    let subcategory = await subcategoryModel.findByIdAndDelete(id);

    await categoryModel.findOneAndUpdate(
      { subcategory: id },
      { $pull: { subcategory: id } }
    );

    if (!subcategory) {
      return res
        .status(404)
        .json({ success: false, message: "Sub Category Not Found" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Sub Category Deleted Successfully" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

let updateSubCategoryController = async (req, res) => {
  try {
    let { id } = req.params;
    let { name } = req.body;
    let slug = slugify(name, {
      replacement: "-",
      remove: undefined,
      lower: false,
      trim: true,
    });

    let subcategory = await subcategoryModel.findByIdAndUpdate(id, {
      name,
      slug,
    });

    if (!subcategory) {
      return res
        .status(404)
        .json({ success: false, message: "Sub Category Not Found" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Sub Category Updated Successfully" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

let allSubCategoryController = async (req, res) => {
  try {
    let allsubcategory = await subcategoryModel.find({})

    return res.status(200).json({success: true, message: "Fetch All Sub Categore Successfull" , data: allsubcategory})

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  addSubCategoryController,
  deleteSubCategoryController,
  updateSubCategoryController,
  allSubCategoryController
};
