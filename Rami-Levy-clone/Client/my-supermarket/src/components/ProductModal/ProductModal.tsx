import React, { useState } from "react";
import { Product } from "../../rami-types";
import "./product-modal.scss"; // Import CSS file for styling

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose
}) => {
  const base64ImageA = product.product_img_data_a
  ? btoa(
      String.fromCharCode(...new Uint8Array(product.product_img_data_a.data))
    )
  : "";
  const [currentImage, setCurrentImage] = useState(base64ImageA);


  return (
    <div className="modal-container">
      <div className="product-modal">
        <div className="product-details">
          <h1>{product.product_name}</h1>
          <p>{product.product_description}</p>
          <p>מחיר: {product.product_price} ₪</p>
          <p>יצרן: {product.brand}</p>
          <p>מדינת ייצוא: {product.export_country}</p>
        </div>
        <div>
          <p>הצעת הגשה: {product.serving_suggestion}</p>
          <p>רכיבים: {product.product_components}</p>
        </div>
        <div className="carousel-item active">
              <img
                src={`data:image/jpeg;base64,${currentImage}`}
                className="d-block product-img"
                alt="Product Image"
              />
            </div>
        <div className="product-buttons">
          <button onClick={onClose}>הוסף לעגלה</button>
          <button onClick={onClose}>סגור</button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
