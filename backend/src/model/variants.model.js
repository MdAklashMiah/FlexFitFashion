const { default: mongoose } = require("mongoose");

const variantSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
    size: { type: String },
    color: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Variant", variantSchema);
