import { Router } from "express";
import auth from "../middleware/auth.js";
import {
    addAddressController, deleteAddressController,
    getAllAddressController, updateAddressController } from "../controllers/addressController.js";

const addressRouter = Router();

addressRouter.post('/add-address', auth, addAddressController)
addressRouter.get('/all-address', auth, getAllAddressController)
addressRouter.put('/update-address', auth, updateAddressController)
addressRouter.delete('/delete-address', auth, deleteAddressController)

export default addressRouter