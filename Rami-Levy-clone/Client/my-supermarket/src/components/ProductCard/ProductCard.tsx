import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getSalesAPI } from "../../features/sales/salesAPI";
import { selectSales } from "../../features/sales/salesSlice";
import { Product, ProductsList, Sales } from "../../rami-types";
import ProductCounter from "../ProductCounter/ProductCounter";
import ProductModal from "../ProductModal/ProductModal";
import "./productCard.scss";

const ProductCard: React.FC<{ product: Product | ProductsList }> = ({
  product,
}) => {
  const dispatch = useAppDispatch();

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showProductModal, setShowProductModal] = useState(false);
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
    const target = event.target as HTMLElement;
    if (
      target.classList.contains("counter-button") ||
      target.parentElement?.classList.contains("counter-button")
    ) {
      return;
    }

    setShowProductModal(true);
  };

  const checkDiscount = () => {
    if (allSales.length > 0 && product.product_price) {
      const sale = allSales.find((s) => s.product_id === product.product_id);
      if (sale) {
        const formattedSalePrice = sale.sale_price?.toFixed(2); // Format sale price
        const formattedOriginalPrice = product.product_price.toFixed(2); // Format original price

        return (
          <div className="card-price">
            <p className="card-price-discount">
              {formattedSalePrice?.split(".")[0]}.
              <span className="decimal-part">
                {formattedSalePrice?.split(".")[1]}
              </span>
              <span className="sale-tag"> מבצע</span>
              <span className="card-shekel"> ₪</span>
              <span className="per-unit"> ליח'</span>
              <img
                className="rami-club-img"
                src="/src/assets/img/rami-club.png"
              />
            </p>
            <p className="card-original-price">
              {formattedOriginalPrice} ₪ ליח'{" "}
            </p>
          </div>
        );
      }
    }
    const formattedProductPrice = product.product_price?.toFixed(2); // Format product price
    return (
      <p className="card-price">
        {formattedProductPrice?.split(".")[0]}.
        <span className="decimal-part">
          {formattedProductPrice?.split(".")[1]}
        </span>
        <span className="card-shekel"> ₪</span>{" "}
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
          {checkDiscount()}
        </div>
      </div>
      <Modal
        id={"modal-product"}
        show={showProductModal}
        onHide={() => setShowProductModal(false)}
        dialogClassName="custom-modal"
      >
        <Modal.Body>
          <ProductModal
            onClose={() => setShowProductModal(false)}
            product={product as Product}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductCard;
