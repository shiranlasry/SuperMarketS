import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "../../rami-types";

const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className="container mt-4">
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
