import {Router} from "express";
import auth from "../middleware/auth.js";
import { cashOnDeliveryController, getOrderListController, onlinePaymentController, webhookController } from "../controllers/orderController.js";

const orderRouter = Router();

orderRouter.post('/cash-on-delivery', auth, cashOnDeliveryController)
orderRouter.post('/online-payment', auth, onlinePaymentController)
orderRouter.post('/webhook', webhookController)
orderRouter.get('/get-order-list', auth, getOrderListController)

export default orderRouter