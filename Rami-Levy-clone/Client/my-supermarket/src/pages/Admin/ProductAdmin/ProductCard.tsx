import React from 'react'
import { Product } from '../../../rami-types'
import './ProductCard.scss'


type ProductCardProps = {
    product: Product
    }

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className='product-card-container'>
      <h3>{product.product_id}</h3>
      <h3>{product.product_name}</h3>
      <h3>{product.product_price}</h3>
      <button>Update</button>
      <button>Delete</button>
      <button>Inventory Manage</button>
      <button>Update Images</button>
    </div>
  )
}

export default ProductCard
