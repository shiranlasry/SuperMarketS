import { useAppDispatch, useAppSelector } from "../../app/hook";
import { productsSelector } from "../../features/products/productsSlice";
import { getSalesAPI } from "../../features/sales/salesAPI";
import { selectSales } from "../../features/sales/salesSlice";
import { Sales } from "../../rami-types";
import { useEffect } from "react";
import { getAllProductsApi } from "../../features/products/productsAPI";
import SaleCard from "../SaleCard/SaleCard";
import "./salesList.scss";
const SalesList = () => {
  const allProducts = useAppSelector(productsSelector);
  const allSales = useAppSelector<Sales[]>(selectSales);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (allSales.length === 0) {
      // Fetch all sales from the server
      dispatch(getSalesAPI());
    }
    if (!allProducts) {
      dispatch(getAllProductsApi());
    }
  }, []);

  return (
    <div className="sales-list">
      {allProducts &&
        allSales.map((sale) => {
          const product = allProducts.find(
            (p) => p.product_id === sale.product_id
          );
          return product ? (
            <SaleCard key={sale.sale_id} sale={sale} product={product} />
          ) : (
            <h2>בקרוב מבצעים חדשים, יש למה לחכות...</h2>
          );
        })}
    </div>
  );
};

export default SalesList;
