const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
      unique: [true, "Category name must be Unique"],
    },
    image: {
      type: String,
      required: [true, "image is Required"],
    },
    slug: {
      type: String,
    },
    subcategory: [
      {
        type: mongoose.Types.ObjectId,
        ref: "SubCategory"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
