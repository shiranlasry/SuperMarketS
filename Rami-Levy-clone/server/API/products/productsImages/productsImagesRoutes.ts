import express from "express";
import { addNewProductImages, deleteImagesWithProductId, deleteSingleImage, updateImagesWithProductId } from "./productsImagesCtrl";
import { isAdmin } from "../../middlewares/authMiddleware";




const router = express.Router()

router
    .post("/add-new-product-images", addNewProductImages)
    .delete('/delete-product-image/:product_id',deleteImagesWithProductId)
    .patch(`/update-product-image`, isAdmin, updateImagesWithProductId)  
    .patch(`/delete-single-image`, isAdmin, deleteSingleImage)
export default router