const { default: mongoose } = require("mongoose");
const { array } = require("../utils/upload");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is Required"],
    },
    description: {
      type: String,
      required: [true, "Description is Required"],
    },
    images: {
      type: Array,
      required: [true, "Image is Required"],
    },
    slug: {
      type: String,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    stock: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    discountprice: {
      type: Number,
    },
    variantType: {
      type: String,
      enum: ["singleVariant", "multiVariant"],
    },
    variants: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Variant",
      },
    ],
    reviews: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
