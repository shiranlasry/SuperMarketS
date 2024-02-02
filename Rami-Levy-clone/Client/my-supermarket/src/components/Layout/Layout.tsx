// layout.tsx

import React, { ReactNode } from 'react';
import NavBar from '../../components/Navbar/NavBar';
// import ShoppingCart from './ShoppingCart';
// import ShoppingBasket from './ShoppingBasket';
// import Footer from './Footer';

interface LayoutProps {
    children: ReactNode;
  }

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-container">
      <NavBar />
      <div className="content">{children}</div>
      {/* <ShoppingCart />
      <ShoppingBasket /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
