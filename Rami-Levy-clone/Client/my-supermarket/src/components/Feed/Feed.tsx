import React from "react";
import { Product } from "../../types/productTypes";
import ProductCard from "../ProductCard/ProductCard";

type FeedProps = {
  products: Product[];
};

const Feed: React.FC<FeedProps> = ({ products }) => {
  return (
    <div className="product-feed d-flex flex-wrap">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Feed;
