import express from 'express';
import { addNewOrder, deleteOrder, getAllOrders, getOrderById, getUserOrdersList, updateOrder } from './ordersCtrl';

const router = express.Router()

router
    .get("/", getAllOrders)
    .get("/:order_id", getOrderById)
    .post("/add-new-order", addNewOrder)
    .patch("/update-order", updateOrder)
    .delete("/delete-order", deleteOrder)
    .get("/get-user-orders-list/:user_id", getUserOrdersList)

export default router