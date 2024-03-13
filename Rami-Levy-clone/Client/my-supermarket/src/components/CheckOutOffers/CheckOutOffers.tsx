import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hook";
import {
  setIsOpenCartTrue,
  setIsToPayPressedFalse,
  setIsToPayPressedTrue,
} from "../../features/cart/cartSlice";
import { productsSelector } from "../../features/products/productsSlice";
import { useSelector } from "react-redux";
import { getAllProductsApi } from "../../features/products/productsAPI";
import { Product } from "../../rami-types";
import ProductCard from "../ProductCard/ProductCard";
import PersonalProfil from "../../pages/PersonalProfil/PersonalProfil";
import "./check-out-offers.scss";

const CheckOutOffers = () => {
  const allProducts = useSelector(productsSelector);
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [showProducts, setShowProducts] = useState(true); // State to track whether to show products
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!allProducts) {
      // Fetch products
      dispatch(getAllProductsApi());
    }
  }, []);

  useEffect(() => {
    getRandomProducts();
  }, [allProducts]);

  const getRandomProducts = () => {
    if (allProducts) {
      const random = [...allProducts]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      setRandomProducts(random);
    }
  };

  useEffect(() => {
    dispatch(setIsOpenCartTrue());
    dispatch(setIsToPayPressedTrue());
    return () => {
      // Cleanup function to set isToPayPressed to false when leaving the CheckOutOffers component
      dispatch(setIsToPayPressedFalse());
    };
  }, [dispatch]);

  // Function to handle button click in Personal Profile menu
  const handleMenuClick = (buttonName: string) => {
    setShowProducts(false); // Hide products when a menu item is clicked
    dispatch(setIsToPayPressedFalse());
  };

  return (
    <div className="checkout-container">
      <div className="row">
        <div className="suggestions-content col-md-2">
          <PersonalProfil onMenuClick={handleMenuClick} />{" "}
          {/* Pass handleMenuClick as a prop to PersonalProfil */}
        </div>
        {showProducts && ( // Conditionally render products based on showProducts state
          <div className="col-md-6">
            <div className="row">
              <div className="col-12">
                <h1 className="suggestions-title mt-3 mb-3">
                  אולי יעניין אותך
                </h1>
              </div>
              {randomProducts.map((product) => (
                <div key={product.product_id} className="col-12 col-md-4 mb-3">
                  <div className="product-card-wrapper">
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckOutOffers;
