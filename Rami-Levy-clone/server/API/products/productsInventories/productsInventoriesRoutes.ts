//inventory routes
import express from "express";
import { addNewProductInventory, deleteInventory, updateInventory } from "./productsInventoriesCtrl";




const router = express.Router()

router
    .post("/add-new-product-inventory", addNewProductInventory)
    .patch(`/update-inventory`, updateInventory)
    .delete('/delete-product-inventory/:product_id',deleteInventory)


export default router