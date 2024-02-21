import express from "express";
import { addNewProductImages, deleteImagesWithProductId } from "./productsImagesCtrl";
import { isAdmin } from "../../middlewares/authMiddleware";




const router = express.Router()

router
    .post("/add-new-product-images", addNewProductImages)
    .delete('/delete-product-image/:product_id',deleteImagesWithProductId)


export default router