import express from 'express';
import { addNewCart, deleteCart, getAllCarts, getCartById, updateCart } from './cartsCtrl';

const router = express.Router()

router
    .get("/", getAllCarts)
    .get("/:cart_id", getCartById)
    .post("/add-new-cart", addNewCart)
    .patch("/update-cart", updateCart)
    .delete("/delete-cart", deleteCart)
    
export default router