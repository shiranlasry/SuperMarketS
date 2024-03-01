import React from "react";
import { Product } from "../../rami-types";
import "./product-modal.scss"; // Import CSS file for styling

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  show: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  show,
}) => {
  if (!show) return null; // Hide modal if show is false

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{product.product_name}</h2>
        <p>{product.product_description}</p>
        <p>Price: {product.product_price}</p>
        <p>Brand: {product.brand}</p>
        <p>Export Country: {product.export_country}</p>
        {/* Add more product information as needed */}

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProductModal;
