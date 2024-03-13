import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import Logo from "../../assets/logos/rami-levy-online.png";
import { updateDeliveryStatusApi } from "../../features/api/deliveriesAPI";
import { addNewUserContactAPI } from "../../features/api/usersContactsAPI";

import {
  activeCartSelector,
  isOpenCartSelector,
  isToPayPressedSelector,
  setIsOpenCart,
} from "../../features/cart/cartSlice";
import {
  getUserAddressesApi,
  getUserFromTokenApi,
} from "../../features/logged_in_user/loggedInUserAPI";
import { loggedInUserSelector } from "../../features/logged_in_user/loggedInUserSlice";
import { addNewOrderAPI } from "../../features/orders/ordersAPI";
import { getAllProductsApi } from "../../features/products/productsAPI";
import { productsSelector } from "../../features/products/productsSlice";
import { Address, Delivery, Order } from "../../rami-types";
import ProductCounter from "../ProductCounter/ProductCounter";
import ProductPrice from "../ProductPrice/ProductPrice";
import ShoppingCartBar from "../ShoppingCartBar/ShoppingCartBar";
import CartSummery from "./CartSummery/CartSummery";
import BeforePayModal from "./CartSummery/Modals/BeforePayModal";
import "./shopping-cart.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { updateCartStatusApi } from "../../features/cart/cartAPI";

const ShoppingCart: React.FC = () => {
  const activeCart = useAppSelector(activeCartSelector);
  const isOpenCart: boolean = useAppSelector(isOpenCartSelector);
  const loggedInUser = useAppSelector(loggedInUserSelector);
  const isToPayPressed: boolean = useAppSelector(isToPayPressedSelector);
  const allProducts = useAppSelector(productsSelector);
  const [orderContact, setOrderContact] = useState({
    full_name: loggedInUser?.first_name + " " + loggedInUser?.last_name || "",
    phone_number: loggedInUser?.phone_number || "",
  });
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
    null
  );

  const initialOrder: Order = {
    order_id: null,
    cart_id: null,
    user_id: loggedInUser?.user_id || null,
    user_contact_id: null,
    delivery_id: null,
    order_creation_date: new Date().toLocaleDateString('he-IL'),
    status: 1,
    alternative_products: "צרו קשר לתיאום",
    how_receive_shipment: "יש מישהו בבית",
    delivery_finish_date:"",
    delivery_start_time:"",
    contact_phone_number:"",
    contact_name:"",
  };
  const [newOrder, setNewOrder] = useState<Order>(initialOrder);
  const [showBeforePayModal, setShowBeforePayModal] = useState(false);

  const handleSetNewOrder = (field: string, value: string | number) => {

    setNewOrder({ ...newOrder, [field]: value });
  };
  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!allProducts) {
      dispatch(getAllProductsApi());
    }
   
  }, []);

  useEffect(() => {
    if (activeCart) {
      handleSetNewOrder("cart_id", activeCart.cart_id);
    }
  }, [activeCart]);

  useEffect(() => {
    if (!loggedInUser) {
      getUserToken();
    }
    if (loggedInUser && loggedInUser.user_id) {
      //getUserActiveCart(loggedInUser.user_id)
      handleSetNewOrder("user_id", loggedInUser.user_id);
      setOrderContact({
        full_name: loggedInUser.first_name + " " + loggedInUser.last_name,
        phone_number: loggedInUser.phone_number,
      });
    }
    
  }, [loggedInUser]);

  const getUserToken = async () => {
    const response = await dispatch(getUserFromTokenApi());
    if (response.payload) {
      dispatch(getUserAddressesApi((response.payload as any).user_id));
    }
  };

  const updateContactId = async () => {
    const insertId = await addNewUserContactAPI(
      orderContact.full_name,
      orderContact.phone_number
    );
    if (insertId) {
      handleSetNewOrder("user_contact_id", insertId);
    }
  };
  useEffect(() => {
    if (orderContact.full_name && orderContact.phone_number) {
      updateContactId();
    }
  }, [orderContact]);

  const toggleCart = () => {
    dispatch(setIsOpenCart());
  };

  const sendOrder = async () => {
    if (!selectedDelivery) {
      toast.error("בחר זמן משלוח  ");
      return;
    }
    if (!orderContact.full_name || !orderContact.phone_number) {
      toast.error("מלא את פרטי איש קשר");
      return;
    } else {
      updateContactId();
    }
    // update delivery status

    if (selectedDelivery) {
      
      await updateDeliveryStatusApi(selectedDelivery.delivery_id);
    }
    // add user_contact_id to database and get the id

    if (
      newOrder.user_contact_id &&
      newOrder.delivery_id &&
      newOrder.cart_id &&
      newOrder.user_id
    ) {
      setShowBeforePayModal(true);
    }
  };

  const addNewUserOrder = async () => {
    if (
      newOrder.user_contact_id &&
      newOrder.delivery_id &&
      newOrder.cart_id &&
      newOrder.user_id &&
      newOrder.order_creation_date &&
      newOrder.status &&
      newOrder.alternative_products &&
      newOrder.how_receive_shipment
    ) {
      debugger;
      const response = await dispatch(addNewOrderAPI(newOrder));
      if (response.payload) {
      
        if (activeCart) {
          await dispatch(
            updateCartStatusApi({ cart_id: activeCart?.cart_id, status_id: 2 })
          );
        }
       
        // navigate to order summary with order_id = response.payload
        const order_id = response.payload
        navigate(`/order-summary/${order_id}`);
        setShowBeforePayModal(false); // Close the modal
        window.location.reload()
      }
    }
  };

  const convertToBase64 = (imageString: string) => {
    return btoa(String.fromCharCode(...new Uint8Array(imageString)));
  };

  return (
    <div className={`shopping-cart`}>
      <img className="rami-online-cart" src={Logo} alt="Rami Levy Online" />
      {!isToPayPressed && (
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
                  const imageData =
                    product.product_img_data_a &&
                    product.product_img_data_a.data
                      ? `data:image/jpeg;base64,${convertToBase64(
                          product.product_img_data_a.data
                        )}`
                      : null;
                  return (
                    <li className="cart-item" key={cartProduct.cart_id}>
                      <div className="product-details-cart">
                        {imageData && (
                          <img src={imageData} alt={product.product_name} />
                        )}
                        <h5 className="prod-name-cart">
                          {product.product_name}
                        </h5>
                        <h5 className="prod-counter">
                          <ProductCounter product={product} location={"cart"} />
                        </h5>
                        <p className="cart-items-price">
                          <ProductPrice product={cartProduct} />₪
                        </p>
                      </div>
                    </li>
                  );
                }
                return null; // Skip rendering if product is not found
              }
            })}
        </ul>
      )}
      {isToPayPressed && (
        <ul className="cart-content">
          <CartSummery
            orderContact={orderContact}
            setOrderContact={setOrderContact}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            selectedDelivery={selectedDelivery}
            setSelectedDelivery={setSelectedDelivery}
            setNewOrder={handleSetNewOrder}
            newOrder={newOrder}
          />
          <Modal
            show={showBeforePayModal}
            onHide={() => setShowBeforePayModal(false)}
            dialogClassName="custom-modal"
          >
            <Modal.Body>
              <BeforePayModal
                onCancle={() => setShowBeforePayModal(false)}
                onPay={addNewUserOrder}
              />
            </Modal.Body>
          </Modal>
        </ul>
      )}
      <ShoppingCartBar
        isOpen={isOpenCart}
        toggleCart={toggleCart}
        sendOrder={sendOrder}
        isToPayPressed={isToPayPressed}
      />
    </div>
  );
};

export default ShoppingCart;
