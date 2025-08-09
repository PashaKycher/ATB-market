import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    image: {
        type: Array,
        default: []
    },
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "category",
        }
    ],
    subCategory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "subCategory",
        }
    ],
    unit: {
        type: String,
        default: ""
    },
    stock: {
        type: Number,
        default: null
    },
    price: {
        type: Number,
        default: null
    },
    discount: {
        type: Number,
        default: null
    },
    description: {
        type: String,
        default: ""
    },
    more_details: {
        type: Object,
        default: {}
    },
    publish: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// create a text index
productSchema.index({ 
    name: "text",
    description: "text"
},{
    wights: {
        name: 5,
        description: 1
    }
});

const ProductModel = mongoose.model("product", productSchema);

export default ProductModel;