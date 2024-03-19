import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { allOrdersSalesDetailsSelector } from "../../../features/orders/ordersSlice";
import { getAllOrdersSalesDetailsAPI } from "../../../features/orders/ordersAPI";
import { productsSelector } from "../../../features/products/productsSlice";
import { getAllProductsApi } from "../../../features/products/productsAPI";
import ProductCard from "../../../components/ProductCard/ProductCard";
import "./best-sellers.scss";

const BestSellers = () => {
  const allProductsSaleAmount = useAppSelector(allOrdersSalesDetailsSelector);
  const allProducts = useAppSelector(productsSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!allProductsSaleAmount) {
      dispatch(getAllOrdersSalesDetailsAPI());
    }
    if (!allProducts) {
      dispatch(getAllProductsApi());
    }
  }, []);

  useEffect(() => {
    console.log(allProductsSaleAmount);
  }, [allProductsSaleAmount]);

  // Sort the products by total_quantity
  const sortedProducts = allProductsSaleAmount
    ? allProductsSaleAmount
        .slice()
        .sort((a, b) => (b.total_quantity || 0) - (a.total_quantity || 0))
    : [];

  // Get the top 20 products
  const top20Products = sortedProducts.slice(0, 20);

  return (
    <div className="hp-feed-main">
      <h1 className="hp-feed-title">המוצרים הנמכרים ביותר</h1>
      <div className="best-seller-prods">
        {top20Products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
