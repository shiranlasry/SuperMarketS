import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getSalesAPI } from "../../features/sales/salesAPI";
import { selectSales } from "../../features/sales/salesSlice";
import { ProductsList } from "../../rami-types";

const ProductPrice: React.FC<{ product: ProductsList }> = ({ product }) => {
  const [price, setPrice] = useState<number | null>(0);
  const dispatch = useAppDispatch();
  const allSales = useAppSelector(selectSales);

  useEffect(() => {
    if (allSales.length === 0) {
      dispatch(getSalesAPI());
    }
    checkDiscount(product);
  }, [product]);

  const checkDiscount = (product: ProductsList | null): number => {
    if (product) {
      if (allSales.length > 0) {
        const sale = allSales.find((s) => s.product_id === product.product_id);
        if (sale) {
          setPrice(sale.sale_price * product.product_amount);
        } else {
          setPrice(product.product_price * product.product_amount);
        }
      } else {
        setPrice(product.product_price * product.product_amount);
      }
    }
    return 0;
  };
  const formatPrice = (price: number) => {
    const [main, decimal] = price.toFixed(2).split(".");
    return (
      <span>
        <span className="main-price">{main}.</span>
        <sup className="decimal-price">{decimal}</sup>
      </span>
    );
  };
  return <>{price && formatPrice(price)}</>;
};

export default ProductPrice;
