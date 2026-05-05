const { default: mongoose } = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Code is Required"],
      uppercase: true,
      trim: true,
    },
    minPrice: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    dateExpiry: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Coupon", couponSchema);
