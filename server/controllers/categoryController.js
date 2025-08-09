import CategoryModel from "../models/categoryModel.js";
import UserModel from "../models/userModel.js";

// add category
export async function addCategoryController(req, res) {
    try {
        const { name, image } = req.body;
        // check if data is valid
        if (!name || !image) {
            return res.status(400).json({
                message: "Provide name and image",
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
        // create category
        const addCategory = new CategoryModel({ name, image });
        // save category
        const saveCategory = await addCategory.save();
        // check if category is saved
        if (!saveCategory) {
            return res.status(500).json({
                message: "Category not created",
                succsess: false,
                error: true
            });
        }
        // return response
        res.status(200).json({
            message: "Category created successfully",
            succsess: true,
            error: false,
            data: addCategory
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
};
// get all categories
export async function getAllCategoriesController(req, res) {
    try {
        const categories = await CategoryModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: "Categories get successfully",
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
// update category
export async function updateCategoryController(req, res) {
    try {
        const { categoryId, name, image } = req.body;
        // check if data is valid
        if (!name || !image) {
            return res.status(400).json({
                message: "Provide name and image",
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
        // update category
        const updateCategory = await CategoryModel.updateOne({ _id: categoryId }, { name, image });
        // check if category is updated
        if (!updateCategory) {
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
            data: updateCategory
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
};
// delete category
export async function deleteCategoryController(req, res) {
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
        // check if category exists in subcategories
        const checkSubCategory = await SubCategoryModel.find({ 
            category: {"$in": [categoryId] } 
        }).countDocuments();
        if (checkSubCategory > 0) {
            return res.status(400).json({
                message: "Category has subcategories",
                succsess: false,
                error: true
            });
        }
        // check if category exists in products
        const checkProduct = await ProductModel.find({ 
            category: {"$in": [categoryId] } 
        }).countDocuments();
        if (checkProduct > 0) {
            return res.status(400).json({
                message: "Category has products",
                succsess: false,
                error: true
            });
        }
        // delete category
        const deleteCategory = await CategoryModel.deleteOne({ _id: categoryId });
        // check if category is deleted
        if (!deleteCategory) {
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
            data: deleteCategory
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
};

