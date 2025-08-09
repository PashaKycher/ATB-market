import { Router } from "express";
import auth from "../middleware/auth.js";
import {
    addProductController, getAllProductsController,
    deleteProductController, editProductController,
    getProductByCategoryController, getProductByCategoryAndSubCategoryController,
    getProductByIdController, searchProductController,
} from "../controllers/productController.js";

const productRouter = Router();

productRouter.post("/add-product", auth, addProductController) 
productRouter.post('/all-product', getAllProductsController)
productRouter.delete('/delete-product', auth, deleteProductController)
productRouter.put('/update-product', auth, editProductController)
productRouter.post('/product-by-category', getProductByCategoryController)
productRouter.post('/product-by-category-&-sub-category', getProductByCategoryAndSubCategoryController)
productRouter.post('/product-by-id', getProductByIdController)
productRouter.post('/search-product', searchProductController)

export default productRouter