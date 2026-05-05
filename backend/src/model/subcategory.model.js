const { default: mongoose } = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    slug: {
      type: String,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);
