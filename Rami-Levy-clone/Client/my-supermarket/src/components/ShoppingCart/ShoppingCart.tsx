import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import Logo from "../../assets/logos/rami-levy-online.png";
import {
  activeCartSelector,
  isOpenCartSelector,
  isToPayPressedSelector,
  setIsOpenCart,
} from "../../features/cart/cartSlice";
import { productsSelector } from "../../features/products/productsSlice";
import { Address, Delivery, Order, Product, ProductsList, Sales } from "../../rami-types";
import ShoppingCartBar from "../ShoppingCartBar/ShoppingCartBar";
import "./shopping-cart.scss";
import { getAllProductsApi } from "../../features/products/productsAPI";
import CartSummery from "./CartSummery/CartSummery";
import { selectSales } from "../../features/sales/salesSlice";
import { getSalesAPI } from "../../features/sales/salesAPI";
import { loggedInUserSelector } from "../../features/logged_in_user/loggedInUserSlice";
import { updateDeliveryStatusApi } from "../../features/api/deliveriesAPI";
import { addNewUserContactAPI } from "../../features/api/usersContactsAPI";


const ShoppingCart: React.FC = () => {
  const activeCart = useAppSelector(activeCartSelector);
  const isOpenCart: boolean = useAppSelector(isOpenCartSelector);
  const loggedInUser = useAppSelector(loggedInUserSelector);
  const isToPayPressed: boolean = useAppSelector(isToPayPressedSelector);
  const allProducts = useAppSelector(productsSelector);
  const [totalPrice, setTotalPrice] = useState(0);
  const allSales = useAppSelector<Sales[]>(selectSales);
  const [orderContact, setOrderContact] = useState({
    full_name: loggedInUser?.first_name + " " + loggedInUser?.last_name || "",
    phone_number: loggedInUser?.phone_number || "",
  });
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [selectedHowToReceive, setSelectedHowToReceive] =
    useState(" יש מישהו בבית");
  const [selectedAlternativeProducts, setSelectedAlternativeProducts] =
    useState("צרו קשר לתיאום");
  const  initialOrder: Order = {
    order_id: null,
    cart_id: null,
    user_id: null,
    user_contact_id: null,
    delivery_id: null,
    order_creation_date: Date.now().toString(),
    status: 1,
  };
  const [newOrder, setNewOrder] = useState<Order>(initialOrder);
  const hanelsetNewOrder = (field : string, value : string | number) => {
    setNewOrder({...newOrder, [field]: value});
  }

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!allProducts) {
       dispatch(getAllProductsApi());
    }
    if (allSales.length === 0) {
      dispatch(getSalesAPI());
    }
  }, []);
  useEffect(() => {
    if (activeCart) {
      if (activeCart.cartList) {
        setTotalPrice(calculateTotalPrice(activeCart.cartList));
        hanelsetNewOrder('cart_id', activeCart.cart_id);
      } else {
        setTotalPrice(0);
      }
    }
  }, [activeCart]);
useEffect(() => {
    if (loggedInUser && loggedInUser.user_id) {
      hanelsetNewOrder('user_id', loggedInUser.user_id);
    }
  }, [loggedInUser]);

  const toggleCart = () => {
    dispatch(setIsOpenCart());
  };
const sendOrder = async () => {
  // update delivery status
 
  if (selectedDelivery) {
    await updateDeliveryStatusApi(selectedDelivery.delivery_id);
   if (selectedDelivery.delivery_id) {
    hanelsetNewOrder('delivery_id', selectedDelivery.delivery_id);
   }
  
  }
  // add user_contact_id to database and get the id
  if (orderContact)
  {
    const response = await addNewUserContactAPI(orderContact.full_name, orderContact.phone_number);
   
    if (response.payload) {
      hanelsetNewOrder('user_contact_id', response.payload);
    }
  }



}
  const calculateTotalPrice = (cartList: ProductsList[]) => {
    let totalPrice = 0;
    cartList.forEach((cartItem: ProductsList) => {
      const discount = allSales.find(
        (sale) => sale.product_id === cartItem.product_id
      );
      if (discount) {
        totalPrice +=
          (discount.sale_price *  cartItem.product_amount);
      } else
      totalPrice += cartItem.product_price * cartItem.product_amount;
    });
    setTotalPrice(totalPrice);
    return totalPrice;
  };

 
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

  const checkDiscount = (product: Product | null): number => {
    console.log("in checkDiscount", product);
    if (product && allSales.length > 0 && product.product_price) {
      const sale = allSales.find((s) => s.product_id === product.product_id);
      if (sale) {
        return sale.sale_price;
      }
    }
    return 0; // Return undefined if product or sale is not found
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
                        ? formatPrice(checkDiscount(product) * cartProduct.product_amount)
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
   <CartSummery 
    orderContact={orderContact}
    setOrderContact={setOrderContact}
    selectedAddress={selectedAddress}
    setSelectedAddress={setSelectedAddress}
    selectedDelivery={selectedDelivery}
    setSelectedDelivery={setSelectedDelivery}
    selectedHowToReceive={selectedHowToReceive}
    setSelectedHowToReceive={setSelectedHowToReceive}
    selectedAlternativeProducts={selectedAlternativeProducts}
    setSelectedAlternativeProducts={setSelectedAlternativeProducts}


    />
  </ul>
)}

    </ul>
    }
      
      <ShoppingCartBar
        totalPrice={totalPrice}
        isOpen={isOpenCart}
        toggleCart={toggleCart}
         sendOrder={sendOrder}
        isToPayPressed={isToPayPressed}
      />
    </div>
  );
};

export default ShoppingCart;
