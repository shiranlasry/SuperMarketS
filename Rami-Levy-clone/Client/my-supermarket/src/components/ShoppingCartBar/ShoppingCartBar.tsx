import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import "./shopping-cart-bar.scss";
import { setIsToPayPressedTrue } from "../../features/cart/cartSlice";
import { useAppDispatch } from "../../app/hook";
import { is } from "@babel/types";
import { useNavigate } from "react-router-dom";

interface Props {
  totalPrice: number;
  isOpen: boolean;
  toggleCart: () => void; // Function to toggle the cart
  // sendOrder: () => void; // Function to send the order
  isToPayPressed: boolean;
}

const ShoppingCartBar: React.FC<Props> = ({
  totalPrice,
  isOpen,
  toggleCart,
  // sendOrder,
  isToPayPressed,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toPayPressed = async () => {
    await dispatch(setIsToPayPressedTrue());
    navigate("/check_out_offers");
  };
  const goToCheckout = () => {
    debugger;
  };

  return (
    <div
      className={`shopping-cart-bar text-white d-flex justify-content-between align-items-center p-2 ${
        isOpen ? "open" : "closed"
      } ${isToPayPressed ? "to-pay-pressed" : ""}`}
    >
      {!isToPayPressed && (
        <>
          <div className="d-flex align-items-center">
            <button className="toggle-cart-button" onClick={toggleCart}>
              <FontAwesomeIcon
                icon={isOpen ? faChevronDown : faChevronUp}
                className={`mr-2 ${isOpen ? "rotate" : ""}`}
              />
            </button>

            <button className={`toggle-pay-text `} onClick={toPayPressed}>
              לתשלום
            </button>
          </div>
          <div>
            <span className="total-price-bar">{totalPrice}</span>{" "}
            <span className="shekel-bar">₪</span>
          </div>
        </>
      )}

      {isToPayPressed && (
        <button className={`toggle-pay-text `} onClick={goToCheckout}>
          תשלום
        </button>
      )}
    </div>
  );
};

export default ShoppingCartBar;
