import CategoryModel from "../models/categoryModel.js";
import UserModel from "../models/userModel.js";
import SubCategoryModel from "../models/subCategoryModel.js";
import ProductModel from "../models/productModel.js";

// add product
export async function addProductController(req, res) {
    try {
        const {
            name,
            image,
            category,
            subCategory,
            unit,
            price,
            stock,
            discount,
            description,
            more_details,
            publish
        } = req.body;
        if (!name || !image[0] || !category[0] || !subCategory[0] || !unit || !price || !stock || !discount || !description) {
            return res.status(400).json({
                message: "Provide name, image, category, subCategory, unit, price, stock, discount, description",
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
        // add product
        const addProduct = new ProductModel({
            name,
            image,
            category,
            subCategory,
            unit,
            price,
            stock,
            discount,
            description,
            more_details,
            publish
        });
        const saveProduct = await addProduct.save();
        // check if product is added
        if (!addProduct) {
            return res.status(500).json({
                message: "Product not added",
                succsess: false,
                error: true
            });
        }
        return res.status(200).json({
            message: "Product added",
            succsess: true,
            error: false,
            data: saveProduct
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}
// all products
export async function getAllProductsController(req, res) {
    try {
        // get parameters from frond
        let { page, limit, search } = req.body;
        // check if parameters are empty
        if (!page) {
            page = 1
        }
        if (!limit) {
            limit = 10
        }
        // get search
        const query = search ? {
            $text: { $search: search }
        } : {}
        // get skip
        const skip = (page - 1) * limit
        // get products
        const [data, total] = await Promise.all([
            // get products whith parameters "skip, limit, query" and write in "data"
            ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).populate("category").populate("subCategory"),
            // get total count of products whith parameters "query" and write in "total"
            ProductModel.countDocuments(query)
        ])
        return res.status(200).json({
            message: "Products get successfully",
            succsess: true,
            error: false,
            data: data,
            totalCount: total,
            totalNoPage: Math.ceil(total / limit)
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}
// delete product
export async function deleteProductController(req, res) {
    try {
        const { productId } = req.body;
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
        // delete product
        const deleteProduct = await ProductModel.deleteOne({ _id: productId });
        // check if product is deleted
        if (!deleteProduct) {
            return res.status(500).json({
                message: "Product not deleted",
                succsess: false,
                error: true
            });
        }
        return res.status(200).json({
            message: "Product deleted",
            succsess: true,
            error: false,
            data: deleteProduct
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}
// edit product
export async function editProductController(req, res) {
    try {
        const {
            productId,
            name,
            image,
            category,
            subCategory,
            unit,
            price,
            stock,
            discount,
            description,
            more_details,
            publish
        } = req.body;
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
        // update product
        const updateProduct = await ProductModel.updateOne({ _id: productId }, {
            name,
            image,
            category,
            subCategory,
            unit,
            price,
            stock,
            discount,
            description,
            more_details,
            publish
        });
        // check if product is updated
        if (!updateProduct) {
            return res.status(500).json({
                message: "Product not updated",
                succsess: false,
                error: true
            });
        }
        return res.status(200).json({
            message: "Product updated",
            succsess: true,
            error: false,
            data: updateProduct
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}
// get product by Category
export async function getProductByCategoryController(req, res) {
    try {
        const { categoryId } = req.body;
        if (!categoryId) {
            return res.status(400).json({
                message: "Category id is required",
                succsess: false,
                error: true
            });
        }
        const products = await ProductModel.find({
            category: { "$in": [categoryId] }
        }).populate("category").populate("subCategory").limit(20);
        return res.status(200).json({
            message: "Products get successfully 11111",
            succsess: true,
            error: false,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}
// get product by Category and SubCategory
export async function getProductByCategoryAndSubCategoryController(req, res) {
    try {
        const { categoryId, subCategoryId, page, limit } = req.body;
        if (!categoryId) {
            return res.status(400).json({
                message: "Category id is required",
                succsess: false,
                error: true
            });
        }
        if (!subCategoryId) {
            return res.status(400).json({
                message: "SubCategory id is required",
                succsess: false,
                error: true
            });
        }
        if (!page) {
            page = 1
        }
        if (!limit) {
            limit = 10
        }
        // get skip
        const skip = (page - 1) * limit
        // get products
        const [data, total] = await Promise.all([
            // get products whith parameters "skip, limit, query" and write in "data"
            ProductModel.find({
                category: { "$in": [categoryId] },
                subCategory: { "$in": [subCategoryId] }
            }).sort({ createdAt: -1 }).skip(skip).limit(limit).populate("category").populate("subCategory"),
            // get total count of products whith parameters "query" and write in "total"
            ProductModel.countDocuments({
                category: { "$in": [categoryId] },
                subCategory: { "$in": [subCategoryId] }
            })
        ])
        return res.status(200).json({
            message: "Products get successfully",
            succsess: true,
            error: false,
            data: data,
            totalCount: total,
            totalNoPage: Math.ceil(total / limit),
            page: page,
            limit: limit
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}
// get product by Id
export async function getProductByIdController(req, res) {
    try {
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({
                message: "Product id is required",
                succsess: false,
                error: true
            });
        }
        const product = await ProductModel.findOne({ _id: productId }).populate("category").populate("subCategory");
        return res.status(200).json({
            message: "Product get successfully",
            succsess: true,
            error: false,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}
// search product
export async function searchProductController(req, res) {
    try {
        let { search, page, limit } = req.body;
        if (!page) {
            page = 1
        }
        if (!limit) {
            limit = 10
        }
        // get skip
        const skip = (page - 1) * limit
        const query = search ? {
            $text: { $search: search }
        } : {};
        if (query) {
            const [data, total] = await Promise.all([
                // get products whith parameters "skip, limit, query" and write in "data"
                ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).populate("category").populate("subCategory"),
                // get total count of products whith parameters "query" and write in "total"
                ProductModel.countDocuments(query)
            ])
            return res.status(200).json({
                message: "Products get successfully",
                succsess: true,
                error: false,
                data: data,
                totalCount: total,
                totalNoPage: Math.ceil(total / limit),
                page: page,
                limit: limit
            });
        }
        return res.status(200).json({
            message: "Product get successfully",
            succsess: true,
            error: false,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}
