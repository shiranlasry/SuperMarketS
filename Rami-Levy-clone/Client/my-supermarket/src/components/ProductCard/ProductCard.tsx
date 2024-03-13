import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getSalesAPI } from "../../features/sales/salesAPI";
import { selectSales } from "../../features/sales/salesSlice";
import { Product, Sales } from "../../rami-types";
import ProductCounter from "../ProductCounter/ProductCounter";
import ProductModal from "../ProductModal/ProductModal"; // Import the ProductModal component
import "./productCard.scss";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useAppDispatch();

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showProductModal, setShowProductModal] = useState(false); // State for showing ProductModal
  const allSales = useAppSelector<Sales[]>(selectSales);

  useEffect(() => {
    if (allSales.length === 0) {
      dispatch(getSalesAPI());
    }
  }, []);

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
  const [currentImage, setCurrentImage] = useState(base64ImageA);

  const handleCardClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Check if the click occurred on the buttons inside the card
    const target = event.target as HTMLElement;
    if (
      target.classList.contains("counter-button") ||
      target.parentElement?.classList.contains("counter-button")
    ) {
      // Click occurred on the buttons, do not open the modal
      return;
    }

    // Click occurred on the card, open the modal
    setShowProductModal(true);
  };

  const checkDiscount = () => {
    if (allSales.length > 0 && product.product_price) {
      const sale = allSales.find((s) => s.product_id === product.product_id);
      if (sale) {
        return (
          <div className="card-price">
            <p className="card-price-discount">
              מחיר מבצע: {sale.sale_price}
              <span className="card-shekel">₪</span>
              <span className="per-unit"> ליח'</span>
            </p>
            <p className="card-original-price">
              מחיר מקור: {product.product_price}
              <span className="card-shekel">₪</span>
              <span className="per-unit"> ליח'</span>
            </p>
          </div>
        );
      }
    }
    return (
      <p className="card-price">
        {product.product_price} <span className="card-shekel">₪</span>{" "}
        <span className="per-unit">ליח'</span>
      </p>
    );
  };

  return (
    <div
      className="cards-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-card card" onClick={handleCardClick}>
        <ProductCounter product={product} location={"card"} />

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
        </div>
        <div className="card-body">
          <p className="card-title">{product.product_name}</p>
          <p className="card-desc">{product.product_description}</p>
          {/* <p className="card-price">
            {product.product_price} <span className="card-shekel">₪</span>{" "}
            <span className="per-unit">ליח'</span>
          </p> */}
          {checkDiscount()}
        </div>
      </div>
      {/* Render ProductModal when showProductModal is true */}

      <Modal
        id={"modal-product"}
        show={showProductModal}
        onHide={() => setShowProductModal(false)}
        dialogClassName="custom-modal"
      >
        <Modal.Body>
          <ProductModal
            onClose={() => setShowProductModal(false)}
            product={product}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductCard;
