import React, { useEffect, useState } from "react";
import { loggedInUserSelector } from "../../features/logged_in_user/loggedInUserSlice";
import { activeCartSelector } from "../../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { Product } from "../../rami-types";
import {
  UpdateAmountProductCartListApi,
  addNewCartApi,
  addProductToCartListApi,
  getUserActiveCartListApi,
} from "../../features/cart/cartAPI";
import { Button, Modal } from "react-bootstrap";
import Login from "../../pages/LogIn/Login";
import Register from "../../pages/Register/Register";
import "./product-counter.scss";

const ProductCounter: React.FC<{ product: Product; location: string }> = ({
  product,
  location,
}) => {
  const loggedInUser = useAppSelector(loggedInUserSelector);
  const activeCart = useAppSelector(activeCartSelector);
  const [quantity, setQuantity] = useState<number>(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // set the quantity of the product in the cart from the active cart list
    if (activeCart && activeCart.cartList) {
      const productInCart = activeCart.cartList.find(
        (p) => p.product_id === product.product_id
      );
      if (productInCart) {
        setQuantity(productInCart.product_amount);
      } else {
        setQuantity(0);
      }
    }
  }, [activeCart?.cartList]);
  // Function to handle increasing the quantity
  const increaseQuantity = async () => {
    // if the user is not logged in, show the login modal
    if (!loggedInUser || !loggedInUser.user_id) {
      setShowLoginModal(true);
      return;
    }
    // if there is no active cart, create a new one
    if (!activeCart) {
      await dispatch(addNewCartApi(loggedInUser.user_id));
    }
    // if the product is already in the cart, update the amount
    if (activeCart?.cart_id && activeCart.cartList) {
      const productInCart = activeCart.cartList.find(
        (p) => p.product_id === product.product_id
      );
      if (
        productInCart &&
        productInCart.product_amount > 0 &&
        productInCart.product_id
      ) {
        const args: {
          product_id: number;
          cart_id: number;
          product_amount: number;
        } = {
          product_id: productInCart.product_id,
          cart_id: activeCart.cart_id,
          product_amount: productInCart.product_amount + 1,
        };
        await dispatch(UpdateAmountProductCartListApi(args));
        dispatch(getUserActiveCartListApi(args.cart_id));
      } else {
        // if the product is not in the cart, add it with amount 1
        if (activeCart?.cart_id && product.product_id) {
          const args: { product_id: number; cart_id: number } = {
            product_id: product.product_id,
            cart_id: activeCart.cart_id,
          };
          dispatch(addProductToCartListApi(args));
          dispatch(getUserActiveCartListApi(args.cart_id));
        }
      }
    }
  };
  const decreaseQuantity = async () => {
    // need to handle the case when the user is not logged in
    if (!loggedInUser || !loggedInUser.user_id) {
      setShowLoginModal(true);
      return;
    }
    // need to decrease the quantity of the product in the cart
    if (activeCart?.cart_id && activeCart.cartList) {
      const productInCart = activeCart.cartList.find(
        (p) => p.product_id === product.product_id
      );
      if (
        productInCart &&
        productInCart.product_amount > 0 &&
        productInCart.product_id
      ) {
        const args: {
          product_id: number;
          cart_id: number;
          product_amount: number;
        } = {
          product_id: productInCart.product_id,
          cart_id: activeCart.cart_id,
          product_amount: productInCart.product_amount - 1,
        };

        await dispatch(UpdateAmountProductCartListApi(args));
        dispatch(getUserActiveCartListApi(args.cart_id));
      }
    }
  };

  return (
    <div>
      <div className={`counter ${location === "cart" ? "cart-counter" : ""}`}>
        <Button
          className="counter-button"
          variant="light"
          onClick={increaseQuantity}
        >
          +
        </Button>
        <span className="counter-quantity">{quantity}</span>
        {quantity > 0 && (
          <Button
            className="counter-button"
            variant="light"
            onClick={decreaseQuantity}
          >
            -
          </Button>
        )}
      </div>
      <Modal
        id={"modal-login"}
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        dialogClassName="custom-modal"
      >
        <Modal.Body>
          <Login
            onClose={() => setShowLoginModal(false)}
            RegisterPressed={() => setShowRegisterModal(true)}
          />
        </Modal.Body>
      </Modal>

      <Modal
        show={showRegisterModal}
        onShow={() => setShowLoginModal(false)}
        onHide={() => setShowRegisterModal(false)}
        dialogClassName="custom-modal"
      >
        <Modal.Body>
          <Register onClose={() => setShowRegisterModal(false)} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductCounter;
