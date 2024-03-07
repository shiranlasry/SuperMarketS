import express from 'express';
import { addNewOrder, deleteOrder, getAllOrders, getOrderById, getUserOrders,getUserOrderCartDetails, updateOrder } from './ordersCtrl';

const router = express.Router()

router
    .get("/", getAllOrders)
    .get("/:order_id", getOrderById)
    .post("/add-new-order", addNewOrder)
    .patch("/update-order", updateOrder)
    .delete("/delete-order", deleteOrder)
    .get("/get-user-orders/:user_id", getUserOrders)
    .get("/get-user-order-cart-details/:cart_id", getUserOrderCartDetails)

export default router