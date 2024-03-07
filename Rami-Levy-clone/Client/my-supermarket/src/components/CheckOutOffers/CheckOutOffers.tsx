import React, { useEffect } from 'react'
import { useAppDispatch } from '../../app/hook';
import { setIsOpenCartTrue, setIsToPayPressedFalse, setIsToPayPressedTrue } from '../../features/cart/cartSlice';

const CheckOutOffers = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    debugger;
    dispatch(setIsOpenCartTrue());
    dispatch(setIsToPayPressedTrue());
    return () => {
      // Cleanup function to set isToPayPressed to false when leaving the CheckOutOffers component
      dispatch(setIsToPayPressedFalse());
    };
  }, [dispatch]);
  return (
    <div>
        <h1>אולי יעניין אותך</h1>
      
    </div>
  )
}

export default CheckOutOffers
