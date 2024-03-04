import React from "react";
import "./NavBarItemProducts.scss";
import { productsByNavbarItemIDSelector } from "../../../features/products/productsSlice";
import { useAppSelector } from "../../../app/hook";
import ProductCard from "../../ProductCard/ProductCard";

const NavBarItemProducts = () => {
  const productsByNavbarItemID = useAppSelector(productsByNavbarItemIDSelector);

  return (
    <div className="category-visual-container">
      <h1 className="products-by-categories">מוצרים לפי קטגורית אב</h1>
      <div className="row no-gutters">
        {productsByNavbarItemID &&
          productsByNavbarItemID.map((product) => (
            <div
              key={product.product_id}
              className="col-lg-2 col-md-3 col-sm-4 col-6"
            >
              <div className="product-card-wrapper">
                <ProductCard product={product} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NavBarItemProducts;
