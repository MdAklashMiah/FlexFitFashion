let slugify = require("slugify");
const categoryModel = require("../model/category.model");
const fs = require("fs");
const path = require("path");
const subcategoryModel = require("../model/subcategory.model");

let addCategoryController = async (req, res) => {
  try {
    let { name } = req.body;
    let { filename } = req.file;

    let slug = slugify(name, {
      replacement: "-",
      remove: undefined,
      lower: false,
      trim: true,
    });

    let addcategory = new categoryModel({
      name,
      slug,
      image: `${process.env.SERVER_URL}/${filename}`,
    });

    await addcategory.save();
    return res.status(201).json({
      success: true,
      message: "Category Created Successfully",
      data: addcategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

let deleteCategoryController = async (req, res) => {
  try {
    let { id } = req.params;

    await subcategoryModel.deleteMany({ category: id });
    let category = await categoryModel.findByIdAndDelete(id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category Not Found" });
    } else {
      let imageurl = category.image.split("/");
      let imagePath = imageurl[imageurl.length - 1];
      let filePath = path.join(__dirname, "../../uploads");
      fs.unlink(filePath + `/` + imagePath, (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
          });
        }

        return res
          .status(200)
          .json({ success: true, message: "Category Deleted Successfully" });
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

let updateCategoryController = async (req, res) => {
  try {
    let { id } = req.params;
    let { filename } = req.file;
    let { name } = req.body;

    if (!name && !filename) {
      return res
        .status(404)
        .json({ success: false, message: "Name and image are required" });
    } else {
      let category = await categoryModel.findById(id);

      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category Not Found" });
      } else {
        let imageurl = category.image.split("/");
        let imagePath = imageurl[imageurl.length - 1];
        let filePath = path.join(__dirname, "../../uploads");

        fs.unlink(filePath + `/` + imagePath, (err) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Internal server error",
              error: error.message,
            });
          }
        });

        // update category name and image
        let slug = slugify(name, {
          replacement: "-",
          remove: undefined,
          lower: false,
          trim: true,
        });

        category.image = `${process.env.SERVER_URL}/${filename}`;
        category.name = name;
        category.slug = slug;

        await category.save();

        return res
          .status(200)
          .json({
            success: true,
            message: "Category Updated Successfully",
            data: category,
          });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

let allCategoryController = async (req, res) => {
  try {
    let allcategory = await categoryModel.find({}).populate({
      path: "subcategory",
      select: "name slug"
    })

    return res.status(200).json({success: true, message: "Fetch All Categore Successfull" , data: allcategory})

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  addCategoryController,
  deleteCategoryController,
  updateCategoryController,
  allCategoryController
};
