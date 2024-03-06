import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import Logo from "../../assets/logos/rami-levy-online.png";
import Shopping from "../../assets/logos/rami-levy-shopping.png";
import UserMenu from "../../components/UserMenu/UserMenu";
import {
  getUserActiveCartApi,
  getUserActiveCartListApi,
} from "../../features/cart/cartAPI";
import {
  activeCartSelector,
  isOpenCartSelector,
  setIsOpenCart,
} from "../../features/cart/cartSlice";
import { getUserFromTokenApi } from "../../features/logged_in_user/loggedInUserAPI";
import { loggedInUserSelector } from "../../features/logged_in_user/loggedInUserSlice";
import Login from "../../pages/LogIn/Login";
import Register from "../../pages/Register/Register";
import { ProductsList, User } from "../../rami-types";
import "../../views/layouts/layout.scss";
import CartIcon from "../CartIcon/CartIcon";
import { ClosedCart } from "../ClosedCart/ClosedCart";
import NavBar from "../Navbar/NavBar";
import NightMode from "../NightMode/NightMode";
import SearchBar from "../SearchBar/SearchBar";
import ShoppingBasket from "../ShoppingBasket/ShoppingBasket";
import ShoppingCartBar from "../ShoppingCartBar/ShoppingCartBar";
import "./Header.scss";

const Header = () => {
  const loggedInUser: User | null = useAppSelector(loggedInUserSelector);
  const isOpenCart: boolean = useAppSelector(isOpenCartSelector);
  const dispatch = useAppDispatch();

  const activeCart = useAppSelector(activeCartSelector);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);

  const calaTotalPrice = (cartList: ProductsList[]) => {
    let totalPrice = 0;
    cartList.forEach((cartItem: ProductsList) => {
      totalPrice += cartItem.product_price * cartItem.product_amount;
    });
    return totalPrice;
  };

  useEffect(() => {
    if (activeCart && activeCart.cartList) {
      setTotalPrice(calaTotalPrice(activeCart.cartList));
    }
  }, [activeCart]);
  // Toggle the menu state
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  // Function to toggle the shopping cart open/close state
  const toggleCart = () => {
    dispatch(setIsOpenCart());
  };
  // Check if there is a logged-in user based on cookie token
  useEffect(() => {
    if (!loggedInUser) {
      dispatch(getUserFromTokenApi());
    }
  }, []);
  //if there is a logged in user, get the active cart
  const handelGetUserActiveCart = async (user_id: number) => {
    const response = await dispatch(getUserActiveCartApi(user_id));
    console.log("active cart", response.payload);
    if (response.payload && response.payload.cart_id) {
      dispatch(getUserActiveCartListApi(response.payload.cart_id));
    }
  };

  useEffect(() => {
    if (loggedInUser && loggedInUser.user_id) {
      handelGetUserActiveCart(loggedInUser.user_id);
    }
  }, [loggedInUser]);
  //if there is an active cart, get the active cart list

  // Close the login modal when the register modal is shown
  useEffect(() => {
    if (showRegisterModal) {
      setShowLoginModal(false);
    }
  }, [showRegisterModal]);

  // Close the login modal
  const handleCloseLogin = () => {
    setShowLoginModal(false);
  };

  // Close the register modal and show the login modal
  const handleCloseRegister = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  return (
    <div className="header-main">
      <button className="to-main-navBar" onClick={() => navigate("/")}>
        <img className="rami-online" src={Logo} alt="Rami Levy Online" />
      </button>
      <button className="to-shoppin-navBar">
        <img
          className="rami-shopping"
          src={Shopping}
          alt="Rami Levy Shopping"
        />
      </button>
      <SearchBar />
      <NightMode />
      <button className="access">הצהרת נגישות</button>
      {!loggedInUser && (
        <button
          className="hp-loginBtn"
          onClick={() => setShowLoginModal(true)}
          aria-haspopup={true}
          aria-expanded={showLoginModal}
          aria-controls="modal-login"
        >
          <svg
            data-v-c9960dd8=""
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="21.84"
            height="24.52"
            viewBox="0 0 21.84 24.52"
            className="hp-loginSvg"
          >
            <defs data-v-c9960dd8="">
              <clipPath
                data-v-c9960dd8=""
                id="a"
                transform="translate(-1.99 -0.65)"
              >
                <rect
                  data-v-c9960dd8=""
                  width="25.82"
                  height="25.82"
                  fill="none"
                ></rect>
              </clipPath>
            </defs>
            <circle
              data-v-c9960dd8=""
              cx="10.93"
              cy="6.15"
              r="5.65"
              fill="none"
              stroke="#0079f2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></circle>
            <path
              data-v-c9960dd8=""
              d="M12.92,24.67a14.74,14.74,0,0,0,9.71-3.89A2.22,2.22,0,0,0,23,17.93a11.94,11.94,0,0,0-20.16.13,2.14,2.14,0,0,0,.41,2.71A14.68,14.68,0,0,0,12.92,24.67Z"
              transform="translate(-1.99 -0.65)"
              fill="none"
              stroke="#0079f2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="login-title"> התחברות</span>
        </button>
      )}

      {loggedInUser && (
        <div
          className={`greet-user ${isMenuOpen ? "menu-open" : ""}`}
          onClick={toggleMenu}
          title="לאזור האישי"
          data-toggle="tooltip"
          data-placement="bottom"
        >
          <svg
            data-v-c9960dd8=""
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="21.84"
            height="24.52"
            viewBox="0 0 21.84 24.52"
            className="loggedin-Svg"
          >
            <defs data-v-c9960dd8="">
              <clipPath
                data-v-c9960dd8=""
                id="a"
                transform="translate(-1.99 -0.65)"
              >
                <rect
                  data-v-c9960dd8=""
                  width="25.82"
                  height="25.82"
                  fill="none"
                ></rect>
              </clipPath>
            </defs>
            <circle
              data-v-c9960dd8=""
              cx="10.93"
              cy="6.15"
              r="5.65"
              fill="none"
              stroke="#0079f2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></circle>
            <path
              data-v-c9960dd8=""
              d="M12.92,24.67a14.74,14.74,0,0,0,9.71-3.89A2.22,2.22,0,0,0,23,17.93a11.94,11.94,0,0,0-20.16.13,2.14,2.14,0,0,0,.41,2.71A14.68,14.68,0,0,0,12.92,24.67Z"
              transform="translate(-1.99 -0.65)"
              fill="none"
              stroke="#0079f2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          {loggedInUser.first_name}
        </div>
      )}

      {!isOpenCart && <ClosedCart />}

      <NavBar />
      {!isOpenCart && (
        <ShoppingCartBar
          totalPrice={totalPrice}
          isOpen={isOpenCart}
          toggleCart={toggleCart}
          // sendOrder={sendOrder}
        />
      )}

      {isOpenCart && (
        <>
          {/* ClosedCart component is not rendered when isOpenCart is true */}
          <CartIcon />
          <ShoppingBasket />
        </>
      )}

      {!loggedInUser && (
        <Modal
          id={"modal-login"}
          show={showLoginModal}
          onHide={handleCloseLogin}
          dialogClassName="custom-modal"
        >
          <Modal.Body>
            <Login
              onClose={handleCloseLogin}
              RegisterPressed={() => setShowRegisterModal(true)}
            />
          </Modal.Body>
        </Modal>
      )}

      <Modal
        show={showRegisterModal}
        onHide={handleCloseRegister}
        dialogClassName="custom-modal"
      >
        <Modal.Body>
          <Register onClose={handleCloseRegister} />
        </Modal.Body>
      </Modal>

      {/* Render UserMenu conditionally */}
      {loggedInUser && isMenuOpen && (
        <UserMenu loggedInUser={loggedInUser} onClose={toggleMenu} />
      )}
    </div>
  );
};

export default Header;
