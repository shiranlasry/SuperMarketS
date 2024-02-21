//inventory routes
import express from "express";
import { addNewProductInventory, updateInventory } from "./productsInventoriesCtrl";




const router = express.Router()

router
    .post("/add-new-product-inventory", addNewProductInventory)
    .patch(`/update-inventory`, updateInventory)



export default router