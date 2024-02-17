import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProductDetailesBySubFoodCatagoryId } from "../../features/api/productsAPI";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "../../rami-types";



const CategoryVisual = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const {id} =useParams<{ id: string }>();
  if (!id) {
    return null;
  }
 // make it number
  const categoryId = parseInt(id);

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

  
  return (
      <div>
    
        {products && products.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    
  );
}

export default CategoryVisual;

