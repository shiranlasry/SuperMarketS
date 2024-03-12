import express from 'express';
import {getUserActiveCart,addProductToCartList,UpdateAmountProductCartList,getUserActiveCartList, addNewCart, deleteCart, getAllCarts, getCartById, updateCartStatus } from './cartsCtrl';

const router = express.Router()

router
    .get("/", getAllCarts)
    .get("/:cart_id", getCartById)
    .post("/add-new-cart", addNewCart)
    .patch("/update-cart-status", updateCartStatus)
    .delete("/delete-cart", deleteCart)
    .get("/get-user-active-cart/:user_id", getUserActiveCart)
    .get("/get-user-active-cart-list/:cart_id", getUserActiveCartList)
    .post("/add-product-to-cart-list", addProductToCartList)
    .post("/update-amount-product-cart-list", UpdateAmountProductCartList)
    
export default router