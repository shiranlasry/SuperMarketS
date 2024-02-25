import express from "express";
import { addNewProductImages, deleteImagesWithProductId, deleteSingleImage, updateImagesWithProductId } from "./productsImagesCtrl";
import { isAdmin } from "../../middlewares/authMiddleware";




const router = express.Router()

router
    .post("/add-new-product-images", addNewProductImages)
    .delete('/delete-product-image/:product_id',deleteImagesWithProductId)
    .post(`/update-product-image`, updateImagesWithProductId)
    .patch(`/delete-single-image/:product_id/:isA`, isAdmin, deleteSingleImage)
export default router