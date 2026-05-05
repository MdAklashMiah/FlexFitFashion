const { default: slugify } = require("slugify");
const productModel = require("../model/product.model");
const path = require("path");
const fs = require("fs");

const createProductController = async (req, res) => {
  try {
    let {
      title,
      description,
      category,
      stock,
      price,
      discountprice,
      variantType,
      variants,
    } = req.body;

    let slug = slugify(title, {
      replacement: "-",
      remove: undefined,
      lower: false,
      trim: true,
    });

    let productimage = req.files.map((item) => {
      return `${process.env.SERVER_URL}/${item.filename}`;
    });

    let product = new productModel({
      title,
      description,
      slug,
      category,
      stock,
      price,
      discountprice,
      variantType,
      variants,
      images: productimage,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const allProductController = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category) {
      query.category = category;
    }

    let products = await productModel
      .find(query)
      .populate("category", "name slug")
      .populate({ path: "variants", select: "size color" });

    return res.status(200).json({
      success: true,
      message: "All product Fetch Successfully",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const latestProductController = async (req, res) => {
  try {
    let latestProducts = await productModel
      .find({})
      .populate({ path: "variants", select: "size color" })
      .sort({ createdAt: -1 })
      .limit(10);

    return res.status(200).json({
      success: true,
      message: "Latest product Fetch Successfully",
      data: latestProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    let { id } = req.params;

    let product = await productModel.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product Not Found" });
    } else {
      product.images.forEach((url) => {
        let imageurl = url.split("/");
        let imagePath = imageurl[imageurl.length - 1];
        let filePath = path.join(__dirname, "../../uploads");
        fs.unlink(filePath + `/` + imagePath, (err) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Internal server error",
              error: err.message,
            });
          }
        });
      });

      await productModel.findByIdAndDelete(id);

      return res
        .status(200)
        .json({ success: true, message: "Product Deleted Successfully" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

let updateProductController = async (req, res) => {
  try {
    let { id } = req.params;
    let {
      title,
      description,
      category,
      stock,
      price,
      discountprice,
      variantType,
      variants,
    } = req.body;

    let filename = req.file?.filename;

    let product = await productModel.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    } else {
      if (product.images && product.images.length > 0) {
        product.images.forEach((url) => {
          let imageurl = url.split("/");
          let imagePath = imageurl[imageurl.length - 1];
          let filePath = path.join(__dirname, "../../uploads");

          fs.unlink(filePath + `/` + imagePath, (err) => {
            if (err) {
              console.log(err.message);
            }
          });
        });
      }

      let slug = slugify(title, {
        replacement: "-",
        remove: undefined,
        lower: false,
        trim: true,
      });

      if (filename) {
        product.images = [`${process.env.SERVER_URL}/${filename}`];
      }
      product.title = title;
      product.slug = slug;
      product.description = description;
      product.price = price;
      product.discountprice = discountprice;
      product.variantType = variantType;
      product.variants = variants;
      product.stock = stock;
      product.category = category;

      await product.save();

      return res.status(200).json({
        success: true,
        message: "Product Updated Successfully",
        data: product,
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

let singleProductController = async (req, res) => {
  try {
    let { slug } = req.params;

    let product = await productModel.findOne({ slug }).populate({
      path: "variants",
      select: "size color",
    });

    return res.status(200).json({success: true, message: "Product fetch successfully", data: product})
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createProductController,
  allProductController,
  latestProductController,
  deleteProductController,
  updateProductController,
  singleProductController
};
