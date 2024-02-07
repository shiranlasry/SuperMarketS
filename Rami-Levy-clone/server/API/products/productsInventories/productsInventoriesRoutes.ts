//inventory routes
import express from "express";
import { addNewProductInventory } from "./productsInventoriesCtrl";




const router = express.Router()

router
    .post("/add-new-product-inventory", addNewProductInventory)



export default router