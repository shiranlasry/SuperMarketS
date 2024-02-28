import express from "express";
import { addNewProductDetailes,getProductsByNavBarItemId,getAllProductDetailes, getProductDetailesBySubFoodCatagoryId, deleteProduct, updateProductDetailes, getProductPriceById } from "./productsDetaisCtrl";
import { isAdmin } from "../../middlewares/authMiddleware";



const router = express.Router()

router
.post('/add-new-product-detailes',isAdmin,addNewProductDetailes)
    .get('/', getAllProductDetailes)
    .get('/get-products-by-sub-food-category-id/:sub_food_category_id', getProductDetailesBySubFoodCatagoryId)
    .delete('/delete-product/:product_id',isAdmin,deleteProduct)
    .patch(`/update-product-detailes`,isAdmin,updateProductDetailes)
    .get('/get-products-by-navbar-item-id/:navbar_item_id', getProductsByNavBarItemId)
    .get('/get-product-price/:product_id', getProductPriceById)

export default router