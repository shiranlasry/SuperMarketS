import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Product, Sales } from "../../rami-types";
import "./productCard.scss";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { loggedInUserSelector } from "../../features/logged_in_user/loggedInUserSlice";
import { activeCartSelector } from "../../features/cart/cartSlice";
import { Button, Modal } from "react-bootstrap";
import Login from "../../pages/LogIn/Login";
import Register from "../../pages/Register/Register";
import ProductModal from "../ProductModal/ProductModal"; // Import the ProductModal component
import {
  UpdateAmountProductCartListApi,
  addNewCartApi,
  addProductToCartListApi,
  getUserActiveCartListApi,
} from "../../features/cart/cartAPI";
import { selectSales } from "../../features/sales/salesSlice";
import { getSalesAPI } from "../../features/sales/salesAPI";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const loggedInUser = useAppSelector(loggedInUserSelector);
  const activeCart = useAppSelector(activeCartSelector);
  const dispatch = useAppDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showProductModal, setShowProductModal] = useState(false); // State for showing ProductModal
  const allSales = useAppSelector<Sales[]>(selectSales);

  useEffect(() => {
    if (allSales.length === 0) {
      dispatch(getSalesAPI());
    }
  }, []);

  useEffect(() => {
    // set the quantity of the product in the cart from the active cart list
    if (activeCart && activeCart.cartList) {
      const productInCart = activeCart.cartList.find(
        (p) => p.product_id === product.product_id
      );
      if (productInCart) {
        console.log("in product card",productInCart.product_amount);
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
      if ( productInCart && productInCart.product_amount > 0 && productInCart.product_id) {
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
      if (productInCart && productInCart.product_amount > 0 && productInCart.product_id) {
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
     
  }};

  const handleCardClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Check if the click occurred on the buttons inside the card
    const target = event.target as HTMLElement;
    if (
      target.classList.contains("counter-button") ||
      target.parentElement?.classList.contains("counter-button")
    ) {
      // Click occurred on the buttons, do not open the modal
      return;
    }

    // Click occurred on the card, open the modal
    setShowProductModal(true);
  };

  const checkDiscount = () => { 
    if (allSales.length > 0 && product.product_price) {
      const sale = allSales.find((s) => s.product_id === product.product_id);
      if (sale) {
        return (
          <p className="card-price">
            <span className="card-price-discount">מחיר מבצע: </span>{""}
            {sale.sale_price}
            <span className="card-original_price">מחיר מקור</span>{" "}
            {product.product_price}
            <span className="card-shekel">₪</span>{" "}
            <span className="per-unit">ליח'</span>
          </p>
        );
      }
    }
    return (
      <p className="card-price">
        {product.product_price} <span className="card-shekel">₪</span>{" "}
        <span className="per-unit">ליח'</span>
      </p>
    );
  }

  return (
    <div
      className="cards-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-card card" onClick={handleCardClick}>
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
        </div>
        <div className="card-body">
          <p className="card-title">{product.product_name}</p>
          <p className="card-desc">{product.product_description}</p>
          {/* <p className="card-price">
            {product.product_price} <span className="card-shekel">₪</span>{" "}
            <span className="per-unit">ליח'</span>
          </p> */}
          {checkDiscount()}
        </div>
      </div>
      {/* Render ProductModal when showProductModal is true */}

      <Modal
        id={"modal-product"}
        show={showProductModal}
        onHide={() => setShowProductModal(false)}
        dialogClassName="custom-modal"
      >
        <Modal.Body>
          <ProductModal
            onClose={() => setShowProductModal(false)}
            product={product}
          />
        </Modal.Body>
      </Modal>

      
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

export default ProductCard;
