import { Router } from "express";
import auth from "../middleware/auth.js";
import { addProductToCartController, getCartController, 
        updateCartQuantityController, deleteCartController } from "../controllers/cartController.js";

const cartRouter = Router();

cartRouter.post('/add-product-to-cart', auth, addProductToCartController)
cartRouter.get('/get-cart', auth, getCartController)
cartRouter.put('/update-qty', auth, updateCartQuantityController)
cartRouter.delete('/delete-cart', auth, deleteCartController)

export default cartRouter