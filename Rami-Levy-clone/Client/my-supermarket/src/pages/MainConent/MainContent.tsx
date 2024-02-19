// MainContentPage.jsx
import React from "react";
import Feed from "../../components/Feed/Feed";
import { Product } from "../../rami-types";

type MainContentPageProps = {
  products: Product[]; // Define the type of the products parameter
};

const MainContentPage: React.FC<MainContentPageProps> = ({ products }) => {
  // Fetch or pass products as needed
  return (
    <div className="main-content">
      <Feed products={products} />
    </div>
  );
};

export default MainContentPage;
