import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { productsSelector } from '../../features/products/productsSlice';
import { Product } from '../../rami-types';
import { getAllProductsApi } from '../../features/products/productsAPI';

const ProductsByFoodCategory = () => {
    const foodCategoryId= useParams<{food_category_id:string}>().food_category_id;
    const allProducts = useAppSelector(productsSelector)
    const [productsByFoodCategory, setProductsByFoodCategory] = useState<Product[] | null>(null)
    const dispatch = useAppDispatch()
useEffect(() => {
    if (!allProducts) {
         dispatch(getAllProductsApi())
    }
},[])
    useEffect(() => {
        
        if(foodCategoryId && allProducts){
            const products = allProducts.filter((product) => product.food_category_id === +foodCategoryId)
            setProductsByFoodCategory(products)
            
        }
    },[allProducts,foodCategoryId])
  return (
    <div>
        <h1>ProductsByFoodCategory</h1>
      
    </div>
  )
}

export default ProductsByFoodCategory
