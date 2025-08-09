import moongoose from "mongoose";

const orderSchema = new moongoose.Schema({
    userId: {
        type: moongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    orderId: {
        type: String,
        required: [true, "Provide a order id"],
        unique: true
    },
    productId: {
        type: moongoose.Schema.ObjectId,
        ref: "product",
    },
    product_details: {
        name: String,
        image: String
    },
    paymentId: {
        type: String,
        default: ""
    },
    payment_status: {
        type: String,
        default: ""
    },
    delivery_address: {
        type: moongoose.Schema.ObjectId,
        ref: "address",
    },
    delivery_status: {
        type: String,
        default: ""
    },
    sudTotalAmt: {
        type: Number,
        default: 0
    },
    totalAmt: {
        type: Number,
        default: 0
    },
    invoice_receipt: {
        type: String,
        default: ""
    },
}, { timestamps: true });

const OrderModel = moongoose.model("order", orderSchema);

export default OrderModel;