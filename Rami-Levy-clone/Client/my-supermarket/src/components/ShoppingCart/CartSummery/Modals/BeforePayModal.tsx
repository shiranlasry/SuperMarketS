import React from "react";
import "./BeforePayModal.scss";
import RamiBtn from "../../../RamiBtn/RamiBtn";

interface Props {
  onPay: () => void;
  onCancle: () => void;
}

const BeforePayModal: React.FC<Props> = ({ onPay, onCancle }) => {
  return (
    <div className="credit-info-main">
      <h1 className="credit-info-title">מילוי פרטי אשראי</h1>
      <form className="credit-info-form">
        <input
          className="credit-input"
          type="text"
          placeholder="שם בעל הכרטיס"
        />
        <input
          className="credit-input"
          type="text"
          placeholder="מספר כרטיס אשראי"
        />
        <input className="credit-input" type="text" placeholder="תוקף" />
        <input className="credit-input" type="text" placeholder="CVV" />
        <input
          className="credit-input"
          type="text"
          placeholder="מספר תשלומים"
        />
      </form>
      <div className="credit-btns">
        <RamiBtn onClick={onPay}>שלם</RamiBtn>
        <RamiBtn onClick={onCancle}>ביטול</RamiBtn>
      </div>
    </div>
  );
};

export default BeforePayModal;
