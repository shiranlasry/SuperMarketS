import React, { useEffect, useState } from "react";
import { getProductDetailesBySubFoodCatagoryId } from "../../features/api/productsAPI";
import ProductCard from "../ProductCard/ProductCard";

interface CategoryVisualProps {
  categoryId: number;
}

const CategoryVisual: React.FC<CategoryVisualProps> = ({ categoryId }) => {
  const [products, setProducts] = useState<any[]>([]);

  // Fetch products by category ID
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProductDetailesBySubFoodCatagoryId(categoryId);
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Group products by category
  const productsByCategory: { [key: string]: any[] } = {};
  products.forEach((product) => {
    if (!productsByCategory[product.food_category_name]) {
      productsByCategory[product.food_category_name] = [];
    }
    productsByCategory[product.food_category_name].push(product);
  });

  return (
    <div>
      <h1>Category Visual</h1>
      {Object.entries(productsByCategory).map(([categoryName, productList]) => (
        <div key={categoryName}>
          <h2>{categoryName}</h2>
          <ul>
            {productList.map((product, index) => (
                <li key={index}>
                    <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CategoryVisual;
