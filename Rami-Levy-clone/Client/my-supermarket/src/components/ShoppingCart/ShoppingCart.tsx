// ShoppingCart.tsx

import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hook'; // Adjust the path based on your project structure
import { addToCart, selectCartItems } from '../../features/cart/cartSlice';
import './shopping-cart.scss';

const ShoppingCart: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: 1,
        name: 'Product Name',
        price: 10.99,
        quantity: 1,
      })
    );
  };

  return (
    <div className="shopping-cart">
      <div>Shopping Cart</div>
      <button onClick={handleAddToCart}>Add to Cart</button>

      {/* Display Cart Items */}
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity} - Price: ${item.price * item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCart;