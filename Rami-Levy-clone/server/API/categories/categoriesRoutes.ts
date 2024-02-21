//users routes server side
import express from "express";
 import { getFoodCategories, getSUBFoodCategories,addNewFoodCategory, getFoodCategoriesBySubFoodCategoryId } from "./categoriesCtrl";    


const router = express.Router()

router
    .get('/food-categories', getFoodCategories)
    .get('/sub-food-categories', getSUBFoodCategories)
    .post('/add-new-food-category', addNewFoodCategory)
    .get('/food-categories/:sub_food_category_id', getFoodCategoriesBySubFoodCategoryId)


export default router