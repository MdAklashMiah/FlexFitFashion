const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is Required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is Required"],
      trim: true,
    },

    // ✅ better typing
    images: [
      {
        type: String,
        required: true,
      },
    ],

    // ✅ SEO friendly
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "SubCategory",
  required: true,
},

    // ✅ keep (for non-variant product)
    stock: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountprice: {
      type: Number,
      min: 0,
      validate: {
        validator: function (value) {
          return value <= this.price;
        },
        message: "Discount price must be less than or equal to price",
      },
    },

    // ✅ improved naming (but compatible)
    variantType: {
      type: String,
      enum: ["singleVariant", "multiVariant"],
      default: "singleVariant",
    },

    // ✅ keep reference system (no change)
    variants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Variant",
      },
    ],

    // ✅ better review structure (optional improvement)
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: String,
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// ✅ index for faster query
productSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Product", productSchema);