import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Product } from "../../rami-types";
import "./productCard.scss";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { loggedInUserSelector } from "../../features/logged_in_user/loggedInUserSlice";
import { activeCartSelector } from "../../features/cart/cartSlice";
import { Button, Modal } from "react-bootstrap";
import Login from "../../pages/LogIn/Login";
import Register from "../../pages/Register/Register";
import {
  UpdateAmountProductCartListApi,
  addNewCartApi,
  addProductToCartListApi,
  getUserActiveCartListApi,
} from "../../features/cart/cartAPI";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const loggedInUser = useAppSelector(loggedInUserSelector);
  const activeCart = useAppSelector(activeCartSelector);
  const dispatch = useAppDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

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

  // Convert LONGBLOB data to base64 for each image
  const base64ImageA = product.product_img_data_a
    ? btoa(
        String.fromCharCode(...new Uint8Array(product.product_img_data_a.data))
      )
    : "";
  const base64ImageB = product.product_img_data_b
    ? btoa(
        String.fromCharCode(...new Uint8Array(product.product_img_data_b.data))
      )
    : "";
  const [currentImage, setCurrentImage] = useState(base64ImageA);

  // Function to handle switching between images
  const handleImageSwitch = () => {
    if (base64ImageB) {
      setCurrentImage(
        currentImage === base64ImageA ? base64ImageB : base64ImageA
      );
    }
  };

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
    // need to handel the case when the user is not logged in
    //need to decrease the quantity of the product in the cart
  };

  return (
    <div
      className="cards-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-card card">
        {isHovered && (
          <div className="counter">
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
        )}
        <div className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={`data:image/jpeg;base64,${currentImage}`}
                className="d-block product-img"
                alt="Product Image"
              />
            </div>
          </div>
          {/* {base64ImageB && (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                onClick={handleImageSwitch}
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                onClick={handleImageSwitch}
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </>
          )} */}
        </div>
        <div className="card-body">
          <p className="card-title">{product.product_name}</p>
          <p className="card-desc"> {product.product_description}</p>
          <p className="card-price">
            {product.product_price} <span className="card-shekel">₪</span>{" "}
            <span className="per-unit">ליח'</span>
          </p>
        </div>
      </div>
      {showLoginModal && (
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
      )}
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

export default ProductCard;
