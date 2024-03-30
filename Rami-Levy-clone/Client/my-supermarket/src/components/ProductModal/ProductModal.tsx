import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Login from "../../pages/LogIn/Login";
import Register from "../../pages/Register/Register";
import { Product } from "../../rami-types";
import ProductCounter from "../ProductCounter/ProductCounter";
import "./product-modal.scss";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const formatPrice = (price: number | null) => {
  if (price === null) {
    return ""; // or any other placeholder value
  }

  const [main, decimal] = price.toFixed(2).split(".");
  return (
    <span>
      <span className="main-price">{main}.</span>
      <sup className="decimal-price">{decimal}</sup>
    </span>
  );
};

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
          <button className="close-prodBtn" onClick={onClose}>
            X
          </button>
          <h1>{product.product_name}</h1>
          <p>{product.product_description}</p>
          <p className="prod-price">
            {formatPrice(product.product_price)}{" "}
            <span className="ILS-sign">₪</span>
          </p>
          <p>יצרן: {product.brand}</p>
          <p>מדינת ייצוא: {product.export_country}</p>
        </div>
        <div className="prod-desc">
          <p>הצעת הגשה: {product.serving_suggestion}</p>
          <p>רכיבים: {product.product_components}</p>
        </div>
        <ProductCounter product={product} location={"product-modal"} />
        <div className="carousel-item active">
          <img
            src={`data:image/jpeg;base64,${currentImage}`}
            className="d-block product-img"
            alt="Product Image"
          />
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
