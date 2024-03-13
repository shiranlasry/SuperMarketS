import React from 'react';
import { useAppSelector } from '../../../../app/hook';
import { activeCartSelector } from '../../../../features/cart/cartSlice';
import RamiBtn from '../../../RamiBtn/RamiBtn';
import OrderProduct from './OrderProduct';

interface ShowOrderProductsModalProps {
  onClose: () => void;
}

const ShowOrderProductsModal: React.FC<ShowOrderProductsModalProps> = ({ onClose }) => {
  const activeCart = useAppSelector(activeCartSelector);

  return (
    <div>
      {activeCart && activeCart.cartList && activeCart.cartList.length > 0 && (
        <>
          <h3>המוצרים בהזמנה</h3>
          <div className="order-products">
            {activeCart.cartList.map((product) => (
             <OrderProduct key={product.product_id} product={product} />
            ))}
          </div>
        </>
      )}
      <RamiBtn onClick={onClose}>סגור</RamiBtn>
    </div>
  );
};

export default ShowOrderProductsModal;
