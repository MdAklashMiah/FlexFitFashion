const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    size: {
      type: String,
      required: true,
      trim: true,
    },

    color: {
      type: String,
      required: true,
      trim: true,
    },

    // ✅ inventory control
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ✅ optional but important
    sku: {
      type: String,
      unique: true,
      sparse: true, // allow null but unique when exists
    },
  },
  {
    timestamps: true,
  }
);

// ✅ prevent duplicate variant (VERY IMPORTANT)
variantSchema.index(
  { product: 1, size: 1, color: 1 },
  { unique: true }
);

module.exports = mongoose.model("Variant", variantSchema);