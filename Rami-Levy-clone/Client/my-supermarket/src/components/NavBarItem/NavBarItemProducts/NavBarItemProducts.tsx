import React, { useEffect } from 'react'
import './NavBarItemProducts.scss'
import { productsByNavbarItemIDSelector } from '../../../features/products/productsSlice'
import { useAppDispatch, useAppSelector } from '../../../app/hook'
import { getProductsByNavBarItemIdAPI } from '../../../features/products/productsAPI'
import { useParams } from 'react-router'
import ProductCard from '../../ProductCard/ProductCard'



const NavBarItemProducts = () => {
    const productsByNavbarItemID = useAppSelector(productsByNavbarItemIDSelector)
   
  return (
    <div>
     <h1>מוצרים לפי קטגורית אב</h1>
     {productsByNavbarItemID && productsByNavbarItemID.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))
        }
    </div>
  )
}

export default NavBarItemProducts
