const { default: slugify } = require("slugify");
const productModel = require("../model/product.model");
const variantsModel = require("../model/variants.model");
const path = require("path");
const fs = require("fs");

const createProductController = async (req, res) => {
  try {
    let {
      title,
      description,
      category,
      subcategory,
      stock,
      price,
      discountprice,
      variantType,
      variants,
    } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    let slug = slugify(title, {
      replacement: "-",
      remove: undefined,
      lower: false,
      trim: true,
    });

    let productimage = [];
    if (req.files && req.files.length > 0) {
      productimage = req.files.map((item) => {
        return `${process.env.SERVER_URL}/${item.filename}`;
      });
    }

    let product = new productModel({
      title,
      description,
      slug,
      category,
      subcategory,
      stock,
      price,
      discountprice,
      variantType,
      images: productimage,
    });

    await product.save();

    // ✅ Handle variant creation if data is provided in request
    if (variants && variantType === "multiVariant") {
      try {
        const parsedVariants = typeof variants === "string" ? JSON.parse(variants) : variants;
        if (Array.isArray(parsedVariants) && parsedVariants.length > 0) {
          const variantData = parsedVariants.map((v) => ({ ...v, product: product._id }));
          const createdVariants = await variantsModel.insertMany(variantData);
          product.variants = createdVariants.map((v) => v._id);
          await product.save();
        }
      } catch (err) {
        console.log("Variant creation error:", err.message);
      }
    }

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
      if (product.images && product.images.length > 0) {
        product.images.forEach((url) => {
          let imageurl = url.split("/");
          let imagePath = imageurl[imageurl.length - 1];
          let filePath = path.join(__dirname, "../../uploads");
          let fullPath = path.join(filePath, imagePath);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        });
      }

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
      subcategory,
      stock,
      price,
      discountprice,
      variantType,
      variants,
    } = req.body;

    let product = await productModel.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    } else {
      let productimage = product.images;

      if (req.files && req.files.length > 0) {
        // Only delete old images if new ones are uploaded
        if (product.images && product.images.length > 0) {
          product.images.forEach((url) => {
            let imageurl = url.split("/");
            let imagePath = imageurl[imageurl.length - 1];
            let filePath = path.join(__dirname, "../../uploads");
            let fullPath = path.join(filePath, imagePath);
            if (fs.existsSync(fullPath)) {
              fs.unlinkSync(fullPath);
            }
          });
        }
        productimage = req.files.map((item) => {
          return `${process.env.SERVER_URL}/${item.filename}`;
        });
      }

      let slug = product.slug;
      if (title) {
        slug = slugify(title, {
          replacement: "-",
          remove: undefined,
          lower: false,
          trim: true,
        });
      }

      product.title = title || product.title;
      product.slug = slug;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountprice = discountprice || product.discountprice;
      product.variantType = variantType || product.variantType;
      product.variants = variants || product.variants;
      product.stock = stock || product.stock;
      product.category = category || product.category;
      product.subcategory = subcategory || product.subcategory;
      product.images = productimage;

      // ✅ Handle variants update (parse if string)
      if (variants && variantType === "multiVariant") {
        try {
          const parsedVariants = typeof variants === "string" ? JSON.parse(variants) : variants;
          // Note: Full logic for updating/syncing variants can be complex.
          // For now, we ensure it's stored correctly if it's already an array of IDs
          // or we log that it needs processing.
          if (Array.isArray(parsedVariants)) {
            product.variants = parsedVariants;
          }
        } catch (err) {
          console.log("Variant update error:", err.message);
        }
      } else {
        product.variants = variants || product.variants;
      }

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
