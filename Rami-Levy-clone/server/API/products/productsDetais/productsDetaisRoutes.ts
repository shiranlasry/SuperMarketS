import express from "express";
import { addNewProductDetailes,getAllProductDetailes } from "./productsDetaisCtrl";
import { isAdmin } from "../../middlewares/authMiddleware";



const router = express.Router()

router
.post('/add-new-product-detailes',isAdmin,addNewProductDetailes)
.get('/',getAllProductDetailes)



export default router