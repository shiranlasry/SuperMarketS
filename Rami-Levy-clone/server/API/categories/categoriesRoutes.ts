//users routes server side
import express from "express";
 import { getFoodCategories,addNewSubFoodCategory, getSUBFoodCategories,addNewFoodCategory, getFoodCategoriesBySubFoodCategoryId } from "./categoriesCtrl";    
import { isAdmin } from "../middlewares/authMiddleware";


const router = express.Router()

router
    .get('/food-categories', getFoodCategories)
    .get('/sub-food-categories', getSUBFoodCategories)
    .post('/add-new-food-category',isAdmin, addNewFoodCategory)
    .get('/food-categories/:sub_food_category_id', getFoodCategoriesBySubFoodCategoryId)
    .post('/add-new-sub-food-category',isAdmin, addNewSubFoodCategory)


export default router