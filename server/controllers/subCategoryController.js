import SubCategoryModel from "../models/subCategoryModel.js";
import ProductModel from "../models/productModel.js";
import UserModel from "../models/userModel.js";

// add sub category
export async function addSubCategoryController(req, res) {
    try {
        const { name, image, category } = req.body;
        // check if data is valid
        if (!name || !image || !category[0]) {
            return res.status(400).json({
                message: "Provide name, image and categorys",
                succsess: false,
                error: true
            });
        }
        // get user id from request object
        const userId = req.userId; // midedleware (auth.js)
        // check if user exists
        const user = await UserModel.findOne({ _id: userId });
        // check if user is admin
        if (user.role !== "ADMIN") {
            return res.status(400).json({
                message: "You are not admin",
                succsess: false,
                error: true
            });
        }
        // create sub category
        const addSubCategory = new SubCategoryModel({ name, image, category });
        // save category
        const saveSubCategory = await addSubCategory.save();
        // check if sub category is saved
        if (!saveSubCategory) {
            return res.status(500).json({
                message: "Sub category not created",
                succsess: false,
                error: true
            });
        }
        // return response
        res.status(200).json({
            message: "Sub category created successfully",
            succsess: true,
            error: false,
            data: addSubCategory
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
};
// get all sub category
export async function getAllSubCategoriesController(req, res) {
    try {
        const categories = await SubCategoryModel.find().sort({ createdAt: -1 }).populate("category");
        res.status(200).json({
            message: "Sub categories get successfully",
            succsess: true,
            error: false,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
};
// update sub category
export async function updateSubCategoryController(req, res) {
    try {
        const { categoryId, name, image, category } = req.body;
        // check if data is valid
        if (!name || !image || !category[0]) {
            return res.status(400).json({
                message: "Provide name, image and categorys",
                succsess: false,
                error: true
            });
        }
        // get user id from request object
        const userId = req.userId; // midedleware (auth.js)
        // check if user exists
        const user = await UserModel.findOne({ _id: userId });
        // check if user is admin
        if (user.role !== "ADMIN") {
            return res.status(400).json({
                message: "You are not admin",
                succsess: false,
                error: true
            });
        }
        // update sub category
        const updateSubCategory = await SubCategoryModel.updateOne({ _id: categoryId }, { name, image, category });
        // check if category is updated
        if (!updateSubCategory) {
            return res.status(500).json({
                message: "Category not updated",
                succsess: false,
                error: true
            });
        }
        // return response
        res.status(200).json({
            message: "Category updated successfully",
            succsess: true,
            error: false,
            data: updateSubCategory
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
};
// delete sub category
export async function deleteSubCategoryController(req, res) {
    try {
        const { categoryId } = req.body;
        // get user id from request object
        const userId = req.userId; // midedleware (auth.js)
        // check if user exists
        const user = await UserModel.findOne({ _id: userId });
        // check if user is admin
        if (user.role !== "ADMIN") {
            return res.status(400).json({
                message: "You are not admin",
                succsess: false,
                error: true
            });
        }
        // check if category exists in products
        const checkProduct = await ProductModel.find({ 
            sudCategory: {"$in": [categoryId] } 
        }).countDocuments();
        if (checkProduct > 0) {
            return res.status(400).json({
                message: "Sub category has products",
                succsess: false,
                error: true
            });
        }
        // delete category
        const deleteSubCategory = await SubCategoryModel.deleteOne({ _id: categoryId });
        // check if category is deleted
        if (!deleteSubCategory) {
            return res.status(500).json({
                message: "Category not deleted",
                succsess: false,
                error: true
            });
        }
        // return response
        res.status(200).json({
            message: "Category deleted successfully",
            succsess: true,
            error: false,
            data: deleteSubCategory
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
};
