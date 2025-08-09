import CartProductModel from "../models/cartProductModel.js";
import UserModel from "../models/userModel.js";
import ProductModel from "../models/productModel.js";

// add product to cart
export async function addProductToCartController(req, res) {
    try {
        const { productId } = req.body;
        let { quantity } = req.body;
        if (!productId) {
            return res.status(400).json({
                message: "Provide productId",
                succsess: false,
                error: true,
            });
        }
        if (!quantity) {
            quantity = 1;
        }
        // get user id from request object
        const userId = req.userId; // midedleware (auth.js)
        // check if user exists
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return res.status(400).json({
                message: "You are not user",
                succsess: false,
                error: true,
            });
        }
        // check if product exists
        const product = await ProductModel.findOne({ _id: productId });
        if (!product) {
            return res.status(400).json({
                message: "Product not found",
                succsess: false,
                error: true,
            });
        }
        // check if product is already in cart
        const checkItemCart = await CartProductModel.findOne({
            userId: userId,
            productId: productId,
        })
        if (checkItemCart) {
            return res.status(400).json({
                message: "Product already in cart",
                succsess: false,
                error: true,
            });
        }
        // add product to cart
        const cartProduct = new CartProductModel({
            userId: userId,
            productId: productId,
            quantity: quantity,
        });
        const save = await cartProduct.save();
        if (!save) {
            return res.status(400).json({
                message: "Product not added to cart",
                succsess: false,
                error: true,
            });
        }
        const updateCartUser = await UserModel.updateOne(
            { _id: userId },
            { $push: { shopping_cart: save._id } }
        )
        // return response
        return res.status(200).json({
            message: "Product added to cart",
            succsess: true,
            error: false,
            data: save,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true,
        });
    }
}
// get cart
export async function getCartController(req, res) {
    try {
        const userId = req.userId; // middleware (auth.js)
        const cartItems = await CartProductModel.find({ userId: userId }).populate("productId");
        return res.status(200).json({
            message: "Cart get successfully",
            succsess: true,
            error: false,
            data: cartItems,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true,
        });
    }
}
// increment and dicrement quantity
export async function updateCartQuantityController(req, res) {
    try {
        const { _id, qty } = req.body;
        const userId = req.userId; // middleware (auth.js)
        if (!userId) {
            return res.status(400).json({
                message: "Provide userId",
                succsess: false,
                error: true,
            });
        }
        if (!_id) {
            return res.status(400).json({
                message: "Provide productId",
                succsess: false,
                error: true,
            });
        }
        if (!qty) {
            return res.status(400).json({
                message: "Provide quantity",
                succsess: false,
                error: true,
            });
        }
        const updateCart = await CartProductModel.updateOne({ _id: _id }, { quantity: qty });
        return res.status(200).json({
            message: "Cart updated successfully",
            succsess: true,
            error: false,
            data: updateCart,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true,
        });
    }
}
// delete cart
export async function deleteCartController(req, res) {
    try {
        const { _id } = req.body;
        const userId = req.userId; // middleware (auth.js)
        if (!userId) {
            return res.status(400).json({
                message: "Provide userId",
                succsess: false,
                error: true,
            });
        }
        if (!_id) {
            return res.status(400).json({
                message: "Provide productId",
                succsess: false,
                error: true,
            });
        }
        const deleteCart = await CartProductModel.deleteOne({ _id: _id, userId: userId });
        return res.status(200).json({
            message: "Cart deleted successfully",
            succsess: true,
            error: false,
            data: deleteCart,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true,
        });
    }
}