import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Login from "../../pages/LogIn/Login";
import Register from "../../pages/Register/Register";
import { Product } from "../../rami-types";
import ProductCounter from "../ProductCounter/ProductCounter";
import "./product-modal.scss"; // Import CSS file for styling

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const base64ImageA = product.product_img_data_a
    ? btoa(
        String.fromCharCode(...new Uint8Array(product.product_img_data_a.data))
      )
    : "";
  const [currentImage, setCurrentImage] = useState(base64ImageA);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  

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
        <ProductCounter product={product} />
        <div className="carousel-item active">
          <img
            src={`data:image/jpeg;base64,${currentImage}`}
            className="d-block product-img"
            alt="Product Image"
          />
         
        </div>
        <div className="product-buttons">
          <button onClick={onClose}>סגור</button>
        </div>
      </div>
      <Modal
        id={"modal-login"}
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        dialogClassName="custom-modal"
      >
        <Modal.Body>
          <Login
            onClose={() => setShowLoginModal(false)}
            RegisterPressed={() => setShowRegisterModal(true)}
          />
        </Modal.Body>
      </Modal>

      <Modal
        show={showRegisterModal}
        onShow={() => setShowLoginModal(false)}
        onHide={() => setShowRegisterModal(false)}
        dialogClassName="custom-modal"
      >
        <Modal.Body>
          <Register onClose={() => setShowRegisterModal(false)} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductModal;
