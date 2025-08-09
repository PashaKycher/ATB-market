import OrderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
import CartProductModel from "../models/cartProductModel.js";
import mongoose from "mongoose";
import Stripe from "../config/stripe.js";

// discount
export const priceWithDiscount = (price, discount = 1) => {
    const discountAmout = Math.ceil((Number(price) * Number(discount)) / 100);
    const actualPrice = Number(price) - Number(discountAmout);
    return actualPrice
}

// cash on delivery
export async function cashOnDeliveryController(req, res) {
    try {
        // get user id from request object
        const userId = req.userId; // middleware (auth.js)
        // check if user exists
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                succsess: false,
                error: true
            });
        }
        // get data from request
        const { list_items, totalAmt, delivery_address, sudTotalAmt } = req.body;
        // generate order
        const payload = list_items.map(item => {
            return ({
                userId: userId,
                orderId: `ORD-${new mongoose.Types.ObjectId()}`,
                productId: item.productId._id,
                product_details: {
                    name: item.productId.name,
                    image: item.productId.image[0]
                },
                paymentId: "",
                payment_status: "Cash on Delivery",
                delivery_address: delivery_address,
                sudTotalAmt: sudTotalAmt,
                totalAmt: totalAmt,
            })
        })
        // insert order
        const generatOrder = await OrderModel.insertMany(payload);
        // remove cart
        const removeCart = await CartProductModel.deleteMany({ userId: userId });
        // update user
        const updateUser = await UserModel.updateOne({ _id: userId }, { shopping_cart: [] });
        // return response
        return res.status(200).json({
            message: "Order placed successfully",
            succsess: true,
            error: false,
            data: generatOrder
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}

// payment online
export async function onlinePaymentController(req, res) {
    try {
        // get user id from request object
        const userId = req.userId; // middleware (auth.js)
        // check if user exists
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                succsess: false,
                error: true
            });
        }
        // get data from request
        const { list_items, totalAmt, delivery_address, sudTotalAmt } = req.body;
        // generate stripe checkout session
        const line_items = list_items.map(item => {
            return {
                price_data: {
                    currency: "uah",
                    product_data: {
                        name: item.productId.name,
                        images: [item.productId.image[0]],
                        metadata: {
                            productId: item.productId._id
                        }
                    },
                    unit_amount: priceWithDiscount(item.productId.price, item.productId.discount) * 100
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1,
                    maximum: 10
                },
                quantity: item.quantity
            }
        })
        const params = {
            submit_type: "pay",
            payment_method_types: ["card"],
            customer_email: user.email,
            line_items: line_items,
            mode: "payment",
            metadata: {
                userId: userId,
                addressId: delivery_address
            },
            success_url: `${process.env.FRONTEND_URL}/order-success`,
            cancel_url: `${process.env.FRONTEND_URL}/order-cancel`,
        }
        // generate order
        const session = await Stripe.checkout.sessions.create(params)
        // return response
        return res.status(200).json(session);
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}

// http://localhost:8080/api/order/webhook
// payload for order
const getOrderProductItems = async ({
    lineItems,
    userId,
    addressId,
    paymentId,
    payment_status,
}) => {
    const productList = []
    for (const item of lineItems.data) {
        const product = await Stripe.products.retrieve(item.price.product)
        const payload = {
            userId: userId,
            orderId: `ORD-${new mongoose.Types.ObjectId()}`,
            productId: product.metadata.productId,
            product_details: {
                name: product.name,
                image: product.images[0]
            },
            paymentId: paymentId,
            payment_status: payment_status,
            delivery_address: addressId,
            sudTotalAmt: Number(item.amount_total / 100),
            totalAmt: Number(item.amount_total / 100),
        }
        productList.push(payload)
    }
    return productList
}
// stripe webhook
export async function webhookController(req, res) {
    let event = req.body;
    const endPointSecret = process.env.STRIPE_ENPOINT_WEBHOOK_SECRET_KEY

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const lineItems = await Stripe.checkout.sessions.listLineItems(session.id);
            const userId = session.metadata.userId
            const orderProduct = await getOrderProductItems({
                lineItems: lineItems,
                userId: userId,
                addressId: session.metadata.addressId,
                paymentId: session.payment_intent,
                payment_status: session.payment_status,
            })
            const order = await OrderModel.insertMany(orderProduct)
            if (order) {
                // // remove cart
                const removeCart = await CartProductModel.deleteMany({ userId: userId });
                // // update user
                const updateUser = await UserModel.updateOne({ _id: userId }, { shopping_cart: [] });
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    res.send();
}

// get order list
export async function getOrderListController(req, res) {
    try {
        // get user id from request object
        const userId = req.userId; // middleware (auth.js)
        // check if user exists
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                succsess: false,
                error: true
            });
        }
        // get order list
        const orderList = await OrderModel.find({ userId: userId }).sort({ createdAt: -1 }).populate("productId").populate("delivery_address");
        // return response
        return res.status(200).json({
            message: "Order list",
            succsess: true,
            error: false,
            data: orderList
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            succsess: false,
            error: true
        });
    }
}

