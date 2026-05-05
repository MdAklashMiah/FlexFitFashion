const productModel = require("../model/product.model");
const variantsModel = require("../model/variants.model");

let addVariantController = async (req, res) => {
  try {
    let { size, color, product } = req.body;

    
    let productVariant = new variantsModel({ size, color, product });

  
    await productVariant.save(); 

    
    await productModel.findByIdAndUpdate(product, {
      $push: { variants: productVariant._id },
    });

    return res.status(201).json({
      success: true,
      message: "Product variant added successfully",
      data: productVariant,
    });
  } catch (error) {
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This variant (size + color) already exists for the product",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  addVariantController,
};
