import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart"; // Import ShoppingCart component
import { isOpenCartSelector } from "../../features/cart/cartSlice";
import "./layout.scss";

const Layout = () => {
  const isOpenCart: boolean = useAppSelector(isOpenCartSelector);

  return (
    <div className="layout">
      <div>
        <Header />
        <div className="main-container">
          {/* Move Outlet and Footer inside main-container */}
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>

      {/* Render ShoppingCart conditionally and apply styles */}
      {isOpenCart && (
        <div className="shopping-cart-container">
          <ShoppingCart />
        </div>
      )}
    </div>
  );
};

export default Layout;
