import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Product } from "../../rami-types";
import "./productCard.scss";
import { useAppDispatch } from "../../app/hook";
import { addToCart, removeItem } from "../../features/cart/cartSlice";

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
  // State to track the quantity of the product
  const [quantity, setQuantity] = useState(() => {
    // Define the key for storing data in session storage
    const sessionStorageKey = `product_${product.product_id}_quantity`;
    console.log("sessionStorageKey", sessionStorageKey);

    // Get the quantity from session storage
    if (sessionStorage.getItem(sessionStorageKey) === null || sessionStorage.getItem(sessionStorageKey) === undefined) {
      sessionStorage.setItem(sessionStorageKey, JSON.stringify(0));
    }
    const storedQuantity = JSON.parse(sessionStorage.getItem(sessionStorageKey) || "0");
    return storedQuantity;
  });
  
  const dispatch = useAppDispatch();

  // useEffect to save product_id and quantity to session storage
  useEffect(() => {
    // Define the key for storing data in session storage
    const sessionStorageKey = `product_${product.product_id}_quantity`;
    // Save the quantity to session storage
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(quantity));
  }, [quantity, product.product_id]);

  // Function to handle switching between images
  const handleImageSwitch = () => {
    if (base64ImageB) {
      setCurrentImage(
        currentImage === base64ImageA ? base64ImageB : base64ImageA
      );
    }
  };

  // Function to handle increasing the quantity
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    dispatch(addToCart({ product_id: product.product_id || -1, quantity: quantity || 0, price: product.product_price || 0 }));
  };

  // Function to handle decreasing the quantity
  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      dispatch(removeItem({ product_id: product.product_id || -1, quantity: quantity || 0, price: product.product_price || 0 }));
    }
  };

  return (
    <div className="cards-container">
      <div className="product-card card">
        <div className="counter">
          <button className="btn btn-lg btn-primary" onClick={increaseQuantity}>
            +
          </button>
          <span>{quantity}</span>
          {quantity > 0 && (
            <button className="btn btn-lg btn-primary" onClick={decreaseQuantity}>
              -
            </button>
          )}
        </div>
        <div className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={`data:image/jpeg;base64,${currentImage}`}
                className="d-block product-img"
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
