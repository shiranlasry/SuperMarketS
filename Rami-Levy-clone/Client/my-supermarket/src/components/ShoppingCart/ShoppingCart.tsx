import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import Logo from "../../assets/logos/rami-levy-online.png";
import { addNewDeliveryApi } from "../../features/api/deliveriesAPI";
import { addNewOrderApi, updateOrderApi } from "../../features/api/ordersAPI";
import { addNewCartApi } from "../../features/cart/cartAPI";
import {
  activeCartSelector,
  isOpenCartSelector,
  isToPayPressedSelector,
  setIsOpenCart,
} from "../../features/cart/cartSlice";
import { productsSelector } from "../../features/products/productsSlice";
import { ProductsList } from "../../rami-types";
import ShoppingCartBar from "../ShoppingCartBar/ShoppingCartBar";
import "./shopping-cart.scss";
import { updateCartAPI } from "../../features/api/cartsAPI";
import { getAllProductsApi } from "../../features/products/productsAPI";
import { loggedInUserSelector } from "../../features/logged_in_user/loggedInUserSlice";
import CartSummery from "./CartSummery/CartSummery";


const ShoppingCart: React.FC = () => {
  const loggedInUser = useAppSelector(loggedInUserSelector);
  const activeCart = useAppSelector(activeCartSelector);
  const isOpenCart: boolean = useAppSelector(isOpenCartSelector);
  const isToPayPressed: boolean = useAppSelector(isToPayPressedSelector);
  const allProducts = useAppSelector(productsSelector);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!allProducts) {
      // Fetch all products from the server
       dispatch(getAllProductsApi());
      
    }
  }, []);
  useEffect(() => {
    if (activeCart) {
      if (activeCart.cartList) {
        setTotalPrice(calaTotalPrice(activeCart.cartList));
      } else {
        setTotalPrice(0);
      }
    }
  }, [activeCart]);

  const toggleCart = () => {
    dispatch(setIsOpenCart());
  };

  const calaTotalPrice = (cartList: ProductsList[]) => {
    let totalPrice = 0;
    cartList.forEach((cartItem: ProductsList) => {
      totalPrice += cartItem.product_price * cartItem.product_amount;
    });
    return totalPrice;
  };

  // const createNewCart = async () => {
  //   if (activeCart !== null) {
  //     dispatch(addNewCartApi(activeCart.user_id));
  //     window.location.reload();
  //   }
  // }
  //  const sendOrder = async () => {
  //   if (activeCart !== null) {
  //     const order_id = await addNewOrderApi(
  //       activeCart.cart_id,
  //       activeCart.user_id,
  //       new Date()
  //     );
  //     const delivery_id = await addNewDeliveryApi(order_id, new Date());
  //     await updateOrderApi(order_id, delivery_id, 2);
  //     await updateCartAPI(activeCart.cart_id, 2);
  //     createNewCart();
  //   }
  // };

  const formatPrice = (price: number) => {
    const [main, decimal] = price.toFixed(2).split(".");
    return (
      <span>
        <span className="main-price">{main}.</span>
        <sup className="decimal-price">{decimal}</sup>
      </span>
    );
  };

  const convertToBase64 = (imageString: string) => {
    return btoa(String.fromCharCode(...new Uint8Array(imageString)));
  };

  return (
    <div className={`shopping-cart`}>
      <img className="rami-online-cart" src={Logo} alt="Rami Levy Online" />
      {!isToPayPressed &&
      <ul className="cart-content">
      {activeCart &&
        activeCart.cartList &&
        activeCart.cartList.map((cartProduct) => {
          // Find the product corresponding to the cart product
          if (allProducts) {
            const product = allProducts.find(
              (product) => product.product_id === cartProduct.product_id
            );
            if (product) {
              return (
                <li className="cart-item" key={cartProduct.cart_id}>
                  <div className="product-details-cart">
                    <img
                      src={`data:image/jpeg;base64,${convertToBase64(
                        product.product_img_data_a.data
                      )}`}
                      alt={product.product_name}
                    />
                    <h5 className="prod-name-cart">{product.product_name}</h5>
                    {/* Render SVG image */}

                    <p className="cart-items-price">
                      {" "}
                      {product && product.product_price && cartProduct.product_amount
                        ? formatPrice(product.product_price * cartProduct.product_amount)
                        : null}{" "}
                      ₪
                    </p>
                  </div>
                </li>
              );
            }
            return null; // Skip rendering if product is not found
          }
        })}
    </ul>}
    {isToPayPressed &&
    <ul className="cart-content">
     {isToPayPressed && (
  <ul className="cart-content">
   <CartSummery />
  </ul>
)}

    </ul>
    }
      
      <ShoppingCartBar
        totalPrice={totalPrice}
        isOpen={isOpenCart}
        toggleCart={toggleCart}
        // sendOrder={sendOrder}
        isToPayPressed={isToPayPressed}
      />
    </div>
  );
};

export default ShoppingCart;
