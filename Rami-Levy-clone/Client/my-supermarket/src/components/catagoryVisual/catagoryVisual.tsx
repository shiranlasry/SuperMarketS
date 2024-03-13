import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getAllProductsApi } from "../../features/products/productsAPI";
import { productsSelector } from "../../features/products/productsSlice";
import { Product } from "../../rami-types";
import ProductCard from "../ProductCard/ProductCard";
import "./catagoryVisual.scss";

const CategoryVisual = () => {
  const allProducts = useAppSelector(productsSelector);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  if (!id) {
    return null;
  }
  // make it number
  const selectedSubCategoryId = parseInt(id);

  // Fetch products by category ID
  useEffect(() => {
    if (!allProducts) {
      dispatch(getAllProductsApi());
    }
  }, []);

  // Filter products based on selectedSubCategoryId
  useEffect(() => {
    if (allProducts) {
      const filtered = allProducts.filter(
        (product) => product.sub_food_category_id === selectedSubCategoryId
      );
      setFilteredProducts(filtered);
    }
  }, [allProducts, selectedSubCategoryId]);

  return (
    <div className="category-visual-container">
      {filteredProducts.length > 0 && (
        <div className="product-sub-category">
          <p>
            {filteredProducts[0].navbar_item_name} &gt;{" "}
            {filteredProducts[0].food_category_name}
          </p>
          <h2 className="sub-category-title">
            {filteredProducts[0].sub_food_category_name}
          </h2>
          <div className="product-cards-row">
            {filteredProducts.map((product) => (
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
      )}
    </div>
  );
};

export default CategoryVisual;
