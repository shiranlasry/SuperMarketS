import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import "./shopping-cart.scss";
import {  ProductsList} from "../../rami-types";
import {
  activeCartSelector,
  isOpenCartSelector,
  setIsOpenCart,
} from "../../features/cart/cartSlice";
import Logo from "../../assets/logos/rami-levy-online.png";
import ShoppingCartBar from "../ShoppingCartBar/ShoppingCartBar";
import { productsSelector } from "../../features/products/productsSlice";
import { addNewOrderApi, updateOrderApi } from "../../features/api/ordersAPI";
import { addNewDeliveryApi } from "../../features/api/deliveriesAPI";
import { Cart } from './../../rami-types.d';
import { addNewCartApi } from "../../features/cart/cartAPI";

const ShoppingCart: React.FC = () => {
  const activeCart = useAppSelector(activeCartSelector);
  const isOpenCart: boolean = useAppSelector(isOpenCartSelector);
  const allProducts = useAppSelector(productsSelector);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // if (activeCart && activeCart.cartList) {
    //   setTotalPrice(calaTotalPrice(activeCart.cartList));
    // }
    if (activeCart)
    {
      if (activeCart.cartList)
      {
        setTotalPrice(calaTotalPrice(activeCart.cartList));
      }
      else
      {
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

  const sendOrder = async () => {
    console.log("Sending order");
    if (activeCart !== null) {
      const order_id = await (addNewOrderApi(activeCart.cart_id, activeCart.user_id,  new Date()));
      console.log(order_id);
      const delivery_id = await (addNewDeliveryApi(order_id, new Date()));
      await updateOrderApi(order_id, delivery_id, 2);
      //set active cart to null and add new cart  
      dispatch(addNewCartApi(activeCart.user_id));
      console.log("Order sent - new cart created", activeCart);
    }
    
  };

  // Function to format the price with main and decimal parts
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
                        {formatPrice(
                          product.product_price * cartProduct.product_amount
                        )}{" "}
                        ₪
                      </p>
                    </div>
                  </li>
                );
              }
              return null; // Skip rendering if product is not found
            }
          })}
      </ul>
      <ShoppingCartBar
        totalPrice={totalPrice}
        isOpen={isOpenCart}
        toggleCart={toggleCart}
        sendOrder={sendOrder}
      />
    </div>
  );
};

export default ShoppingCart;
