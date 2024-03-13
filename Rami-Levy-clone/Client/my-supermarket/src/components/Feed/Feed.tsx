import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../types/productTypes';

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
