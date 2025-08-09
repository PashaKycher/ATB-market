import { Router } from "express";
import auth from "../middleware/auth.js";
import {
    addCategoryController, getAllCategoriesController, updateCategoryController, 
    deleteCategoryController
} from "../controllers/categoryController.js";


const categoryRouter = Router();

categoryRouter.post("/add-category", auth, addCategoryController)
categoryRouter.get('/all-category', getAllCategoriesController) 
categoryRouter.put('/update-category', auth, updateCategoryController)
categoryRouter.delete('/delete-category', auth, deleteCategoryController)

export default categoryRouter