import moongoose from "mongoose";

const subCategorySchema = new moongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    category: [
        {
            type: moongoose.Schema.Types.ObjectId,
            ref: "category",
        }
    ],
}, { timestamps: true });

const SubCategoryModel = moongoose.model("subCategory", subCategorySchema);

export default SubCategoryModel;