import React, { useState } from 'react';
import axios from 'axios';
import { Product } from '../../../rami-types';
import './ProductCard.scss';
import { updateInventoryAPI } from '../../../features/products/productsAPI';
import { useAppDispatch } from '../../../app/hook';
import UpdateProduct from './UpdateProduct';
import { deleteImagesWithProductIdAPI } from '../../../features/api/imagesAPI';
import { deleteProduct } from '../../../features/api/productsAPI';
import { deleteInventoryAPI } from '../../../features/api/inventoryAPI';
import { updateProductImages } from './../../../features/api/productsAPI';
import UpdateImage from './UpdateImage';
type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showInventoryPopup, setShowInventoryPopup] = useState(false);
  const [currentInventory, setCurrentInventory] = useState<number | undefined>(product.units_stock);
  const [isUpdateProduct, setIsUpdateProduct] = useState(false);
  const [isUpdateImages, setIsUpdateImages] = useState(false);
  const dispatch = useAppDispatch();

  const handleDeleteProduct = async () => {
    dispatch(deleteInventoryAPI({ product_id: product.product_id }));
    dispatch(deleteImagesWithProductIdAPI({ product_id: product.product_id }));
    dispatch(deleteProduct({ product_id: product.product_id }));
  };

  const handleInventoryManage = () => {
    setShowInventoryPopup(true);
  };

  const handleCloseInventoryPopup = () => {
    setShowInventoryPopup(false);
  };

  const handleUpdateInventory = async () => {
    dispatch(updateInventoryAPI({ product_id: product.product_id, units_stock: currentInventory }));
    setShowInventoryPopup(false);
    alert('Inventory updated successfully');
  };

  const UpdateProductFields = () => {
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
    <div className='product-card-container'>
      <h3>{product.product_id}</h3>
      <h3>{product.product_name}</h3>
      <h3>{product.product_price}</h3>
      <button onClick={UpdateProductFields}>עדכן פרטי מוצר</button>
      <button onClick={handleDeleteProduct}>מחק</button>
      <button onClick={handleInventoryManage}>עדכון מלאי</button>
      <button onClick={handleUpdateImages }>עדכון תמונות</button>

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
          <button onClick={handleUpdateInventory}>Save Changes</button>
          <button onClick={handleCloseInventoryPopup}>Close</button>
        </div>
      )}
      {isUpdateProduct && <UpdateProduct product={product} onClose={handleClose} />}
      {isUpdateImages && <UpdateImage product_id={product.product_id} product_img_data_a={product.product_img_data_a}
      product_img_data_b={product.product_img_data_b} product_img_name_a={product.product_img_name_a} product_img_name_b={product.product_img_name_b}  onClose={handleCloseImageUpdate} />}
    </div>
  );
};

export default ProductCard;

