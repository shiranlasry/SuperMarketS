import React, { useState } from 'react';
import axios from 'axios';
import { Product } from '../../../rami-types';
import './ProductCard.scss';
import { updateInventoryAPI } from '../../../features/products/productsAPI';
import { useAppDispatch } from '../../../app/hook';
import UpdateProduct from './UpdateProduct';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showInventoryPopup, setShowInventoryPopup] = useState(false);
  const [currentInventory, setCurrentInventory] = useState<number | undefined>(product.units_stock);
  const [isUpdateProduct, setIsUpdateProduct] = useState(false);
  const dispatch = useAppDispatch();

  const handleDeleteProduct = async () => {
    try {
      const response = await axios.delete(`/api/products-details/delete-product/${product.product_id}`);
      if (response.data.ok) {
        console.log('Product deleted successfully');
        // Optionally, you can update the UI to reflect the deletion
      } else {
        console.error('Error deleting product:', response.data.error);
      }
    } catch (error) {
      console.error('Error deleting product:', error as Error);
    }
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

  return (
    <div className='product-card-container'>
      <h3>{product.product_id}</h3>
      <h3>{product.product_name}</h3>
      <h3>{product.product_price}</h3>
      <button onClick={UpdateProductFields}>Update</button>
      <button onClick={handleDeleteProduct}>Delete</button>
      <button onClick={handleInventoryManage}>Inventory Manage</button>
      <button>Update Images</button>

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
      {isUpdateProduct && <UpdateProduct product={product} />}
    </div>
  );
};

export default ProductCard;
