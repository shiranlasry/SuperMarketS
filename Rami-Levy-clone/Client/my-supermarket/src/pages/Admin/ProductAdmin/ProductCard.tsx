import React, { useState } from "react";
import { Product } from "../../../rami-types";
import "./ProductCard.scss";
import {
  getAllProductsApi,
  updateInventoryAPI,
} from "../../../features/products/productsAPI";
import { useAppDispatch } from "../../../app/hook";
import UpdateProduct from "./UpdateProduct";
import { deleteImagesWithProductIdAPI } from "../../../features/api/imagesAPI";
import { deleteProduct } from "../../../features/products/productsAPI";
import { deleteInventoryAPI } from "../../../features/api/inventoryAPI";
import UpdateImage from "./UpdateImage";
import RamiBtn from "../../../components/RamiBtn/RamiBtn";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showInventoryPopup, setShowInventoryPopup] = useState(false);
  const [isDeleteProduct, setIsDeleteProduct] = useState(false);
  const [currentInventory, setCurrentInventory] = useState<number | undefined>(
    product.units_stock
  );
  const [isUpdateProduct, setIsUpdateProduct] = useState(false);
  const [isUpdateImages, setIsUpdateImages] = useState(false);
  const dispatch = useAppDispatch();

  const handleDeleteProduct = async () => {
    await dispatch(deleteInventoryAPI({ product_id: product.product_id }));
    await dispatch(
      deleteImagesWithProductIdAPI({ product_id: product.product_id })
    );
    await dispatch(deleteProduct({ product_id: product.product_id }));
    setIsDeleteProduct(false);
    dispatch(getAllProductsApi());
  };

  const handleInventoryManage = () => {
    setShowInventoryPopup(true);
  };

  const handleCloseInventoryPopup = () => {
    setShowInventoryPopup(false);
  };

  const handleUpdateInventory = async () => {
    dispatch(
      updateInventoryAPI({
        product_id: product.product_id,
        units_stock: currentInventory,
      })
    );
    setShowInventoryPopup(false);
    toast.success("Inventory updated successfully");
  };

  const updateProductFields = () => {
    setIsUpdateProduct(true);
  };

  const handleClose = () => {
    setIsUpdateProduct(false);
  };

  const handleUpdateImages = () => {
    setIsUpdateImages(true);
  };

  const handleCloseImageUpdate = () => {
    setIsUpdateImages(false);
  };

  return (
    <div className="product-card-container">
      <h3 className="product-desc">מספר מוצר: {product.product_id}</h3>
      <h3 className="product-desc">מוצר: {product.product_name}</h3>
      <h3 className="product-desc">{product.product_price} ₪</h3>
      <RamiBtn onClick={updateProductFields}>עדכן פרטי מוצר</RamiBtn>
      <RamiBtn
        onClick={() => {
          setIsDeleteProduct(true);
        }}
      >
        מחק
      </RamiBtn>
      <RamiBtn onClick={handleInventoryManage}>עדכון מלאי</RamiBtn>
      <RamiBtn onClick={handleUpdateImages}>עדכון תמונות</RamiBtn>

      {showInventoryPopup && (
        <div className="inventory-popup">
          <h3>Inventory Management</h3>
          <label>
            Current Inventory:
            <input
              type="number"
              value={currentInventory}
              onChange={(e) => setCurrentInventory(parseInt(e.target.value))}
            />
          </label>
          <RamiBtn onClick={handleUpdateInventory}>Save Changes</RamiBtn>
          <RamiBtn onClick={handleCloseInventoryPopup}>Close</RamiBtn>
        </div>
      )}
      {isDeleteProduct && (
        <>
          <div className="delete-product-popup">
            <h3 className="delete-prod-forSure">
              אתה בטוח שאתה רוצה למחוק מוצר זה?
            </h3>
            <RamiBtn onClick={handleDeleteProduct}>מחק</RamiBtn>
            <RamiBtn onClick={() => setIsDeleteProduct(false)}>בטל</RamiBtn>
          </div>
        </>
      )}
      {isUpdateProduct && (
        <UpdateProduct product={product} onClose={handleClose} />
      )}
      {isUpdateImages && (
        <UpdateImage
          product_id={product.product_id}
          product_img_data_a={product.product_img_data_a}
          product_img_data_b={product.product_img_data_b}
          product_img_name_a={product.product_img_name_a}
          product_img_name_b={product.product_img_name_b}
          onClose={handleCloseImageUpdate}
        />
      )}
    </div>
  );
};

export default ProductCard;
