import  { useEffect, useState } from "react";
import {  ProductsList, Sales } from "../../rami-types";
import { selectSales } from "../../features/sales/salesSlice";
import { activeCartSelector } from "../../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getSalesAPI } from "../../features/sales/salesAPI";
import "./cart-total-price.scss";

const CartToatlPrice = () => {
  const activeCart = useAppSelector(activeCartSelector);
  const allSales = useAppSelector<Sales[]>(selectSales);

  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (allSales.length === 0) {
      dispatch(getSalesAPI());
    }
  }, []);
  const formatPrice = (price: number) => {
    const [main, decimal] = price.toFixed(2).split(".");
    return (
      <span>
        <span className="main-price">{main}.</span>
        <sup className="decimal-price">{decimal}</sup>
        <span className="cart-shekel"> ₪</span>
      </span>
    );
  };

  const calculateTotalPrice = (cartList: ProductsList[]) => {
    let totalPrice = 0;
    cartList.forEach((cartItem: ProductsList) => {
      const discount = allSales.find(
        (sale) => sale.product_id === cartItem.product_id
      );
      if (discount && discount.sale_price) {
        totalPrice += discount.sale_price * cartItem.product_amount;
      } else totalPrice += cartItem.product_price * cartItem.product_amount;
    });
    setTotalPrice(totalPrice);
    return totalPrice;
  };

  useEffect(() => {
    if (activeCart && activeCart.cartList) {
      setTotalPrice(calculateTotalPrice(activeCart.cartList));
    }
  }, [activeCart]);

  return <>{formatPrice(totalPrice)}</>;
};

export default CartToatlPrice;
