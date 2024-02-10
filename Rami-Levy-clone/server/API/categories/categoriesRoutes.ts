//users routes server side
import express from "express";
 import { getFoodCategories, getSUBFoodCategories, getSubCategoriesNavBarItem } from "./categoriesCtrl";    


const router = express.Router()

router
    .get('/food-categories', getFoodCategories)
    .get('/sub-food-categories', getSUBFoodCategories)
    .get('/sub-categories-navbar-item/:navbarItemId', getSubCategoriesNavBarItem)



export default router