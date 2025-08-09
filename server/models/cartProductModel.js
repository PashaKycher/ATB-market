import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
}, { timestamps: true });

const CartProductModel = mongoose.model("cartProduct", cartProductSchema);

export default CartProductModel;