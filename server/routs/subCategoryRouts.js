import { Router } from "express";
import auth from "../middleware/auth.js";
import {
    addSubCategoryController, deleteSubCategoryController, 
    getAllSubCategoriesController, updateSubCategoryController
} from "../controllers/subCategoryController.js";

const subCategoryRouter = Router();

subCategoryRouter.post("/add-sub-category", auth, addSubCategoryController) 
subCategoryRouter.get('/all-sub-category', getAllSubCategoriesController)
subCategoryRouter.put('/update-sub-category', auth, updateSubCategoryController)
subCategoryRouter.delete('/delete-sub-category', auth, deleteSubCategoryController)

export default subCategoryRouter