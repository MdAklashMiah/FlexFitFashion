const { default: mongoose } = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    link: {
      type: String,
      required: [true, "Image link is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);
