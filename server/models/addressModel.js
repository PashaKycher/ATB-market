import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    country: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    pincode: {
        type: String,
        default: ""
    },
    street: {
        type: String,
        default: ""
    },
    bilding: {
        type: String,
        default: ""
    },
    address_line: {
        type: String,
        default: ""
    },
    mobile: {
        type: String,
        default: null
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const AddressModel = mongoose.model("address", addressSchema);

export default AddressModel;