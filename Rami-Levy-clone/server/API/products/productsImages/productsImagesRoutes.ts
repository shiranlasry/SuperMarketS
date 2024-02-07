import express from "express";
import { addNewProductImages } from "./productsImagesCtrl";




const router = express.Router()

router
    .post("/add-new-product-images", addNewProductImages)



export default router