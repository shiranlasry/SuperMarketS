// MainContentPage.jsx
import React from 'react';
import NavBar from '../../components/Navbar/NavBar';
import Feed from '../../components/Feed/Feed';
import { Product } from '../../types/productTypes'; // Import the Product type

type MainContentPageProps = {
  products: Product[]; // Define the type of the products parameter
};

const MainContentPage: React.FC<MainContentPageProps> = ({ products }) => {
  // Fetch or pass products as needed
  return (
    <div>
      <NavBar />
      <Feed products={products} />
    </div>
  );
};

export default MainContentPage;
