import express from 'express';
import { getAllOrdersSalesDetails,addNewOrder, deleteOrder, getAllOrders, getOrderById, getUserOrders,getUserOrderCartDetails, updateOrder } from './ordersCtrl';
import { isAdmin } from '../middlewares/authMiddleware';

const router = express.Router()

router
    .get("/get-all-orders-sales-details", getAllOrdersSalesDetails)
    
    .post("/add-new-order", addNewOrder)
    .patch("/update-order", updateOrder)
    .delete("/delete-order", deleteOrder)
    .get("/get-user-orders/:user_id", getUserOrders)
    .get("/get-user-order-cart-details/:cart_id", getUserOrderCartDetails)
    .get("/", getAllOrders)
    .get("/:order_id", getOrderById)
    

export default router