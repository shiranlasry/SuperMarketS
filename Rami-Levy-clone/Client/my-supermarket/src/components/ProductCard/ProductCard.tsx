import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Product } from "../../rami-types";
import "./productCard.scss";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  // Convert LONGBLOB data to base64 for each image
  const base64ImageA = product.product_img_data_a
    ? btoa(
        String.fromCharCode(...new Uint8Array(product.product_img_data_a.data))
      )
    : "";
  const base64ImageB = product.product_img_data_b
    ? btoa(
        String.fromCharCode(...new Uint8Array(product.product_img_data_b.data))
      )
    : "";

  // State to track which image is currently displayed
  const [currentImage, setCurrentImage] = useState(base64ImageA);

  // Function to handle switching between images
  const handleImageSwitch = () => {
    if (base64ImageB) {
      setCurrentImage(
        currentImage === base64ImageA ? base64ImageB : base64ImageA
      );
    }
  };

  return (
    <div className="cards-container">
      {" "}
      {/* Adjust column sizes here */}
      <div className="product-card card">
        <div className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={`data:image/jpeg;base64,${currentImage}`}
                className="d-block w-100 product-img"
                alt="Product Image"
              />
            </div>
          </div>
          {base64ImageB && (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                onClick={handleImageSwitch}
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                onClick={handleImageSwitch}
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </>
          )}
        </div>
        <div className="card-body">
          <p className="card-title">{product.product_name}</p>
          <p className="card-desc"> {product.product_description}</p>
          <p className="card-price">
            {product.product_price} <span className="card-shekel">₪</span>{" "}
            <span className="per-unit">ליח'</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
