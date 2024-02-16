import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from '../../types/productTypes';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { name, image, price, brand, unitsOrWeight } = product;

  return (
    <div className="product-card card mx-2 mb-4">
      <img src={image} alt={name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          <strong>{`₪${price.toFixed(2)}`}</strong> per {unitsOrWeight}
        </p>
        <p className="card-text">Brand: {brand}</p>
        <button className="btn btn-primary">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
