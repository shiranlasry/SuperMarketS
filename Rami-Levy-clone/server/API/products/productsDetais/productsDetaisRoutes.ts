import express from "express";
import { addNewProductDetailes,getAllProductDetailes, getProductDetailesBySubFoodCatagoryId, deleteProduct, updateProductDetailes } from "./productsDetaisCtrl";
import { isAdmin } from "../../middlewares/authMiddleware";



const router = express.Router()

router
.post('/add-new-product-detailes',isAdmin,addNewProductDetailes)
    .get('/', getAllProductDetailes)
    .get('/get-products-by-sub-food-category-id/:sub_food_category_id', getProductDetailesBySubFoodCatagoryId)
    .delete('/delete-product/:product_id',deleteProduct)
    .patch(`/update-product-detailes`,updateProductDetailes)

export default router