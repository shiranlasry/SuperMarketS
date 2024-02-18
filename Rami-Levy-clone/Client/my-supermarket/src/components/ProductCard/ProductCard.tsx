import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Product } from '../../rami-types';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {/* {product_imgs && product_imgs.map((img, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
              <img src={img} className="d-block w-100" alt={`Product Image ${index}`} />
            </div>
          ))} */}
         {product.product_img_data_a &&<>
          <div className="carousel-item active">
            <img src={product.product_img_data_a} className="d-block w-100" alt="..." />
          </div>
         </>

         }
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="card-body">
        <h5 className="card-title">{product.product_name}</h5>
        <p className="card-text">Price: {product.product_price}</p>
        <p className="card-text">Description: {product.product_description}</p>
      </div>
    </div>
  );
}

export default ProductCard;
