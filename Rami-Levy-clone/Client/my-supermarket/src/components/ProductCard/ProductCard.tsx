import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Product } from '../../rami-types';


const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const {  product_name,product_price} = product;
  return (
    <div className="card" style={{ width: "18rem" }}>
      {/* <img src={image_url} className="card-img-top" alt={product_name} /> */}
      <div className="card-body">
        <h5 className="card-title">{product_name}</h5>
        <p className="card-text">Price: {product_price}</p>
      </div>
    </div>
  );
}
export default ProductCard;