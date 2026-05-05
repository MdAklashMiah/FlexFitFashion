const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        deliveryCharge: {
            type: String,
            enum: ["insidedhaka", "outsidedhaka"],
            default: "outsidedhaka"
        },
        paymentMethod: {
            type: String,
            enum: ["cod", "online"]
        },
        items: [
            {
                product: {
                    type: mongoose.Types.ObjectId,
                    ref: "Product"
                },
                variants: {
                    type: mongoose.Types.ObjectId,
                    ref: "Variant"
                },
                quantity: {
                    type: Number
                }

            }
        ],
        discount:{
            type: Number,
        },
        totalPrice: {
            type: Number,
            required: true
        },
        orderStatus: {
            type: String,
            enum: ["pending", "cancel", "delivered"],
            default: "pending"
        },
        trans_id: {
            type: String,

        },
        paymentStatus: {
            type: String,
            enum: ["paid", "unpaid"],
            default: "unpaid"
        }
    },
    {timestamps: true}
)


module.exports = mongoose.model("Order", orderSchema)