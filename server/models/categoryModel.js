import moongoose from "mongoose";

const categorySchema = new moongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
}, { timestamps: true });

const CategoryModel = moongoose.model("category", categorySchema);

export default CategoryModel;