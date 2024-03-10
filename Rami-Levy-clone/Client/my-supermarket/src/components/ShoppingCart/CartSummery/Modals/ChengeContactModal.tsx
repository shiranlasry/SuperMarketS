import React, { useState } from "react";
import "./ChengeContactModal.scss";
import { Order } from "../../../../rami-types";
import RamiBtn from "../../../RamiBtn/RamiBtn";

interface Props {
  onClose: () => void;
  orderContact: {
    full_name: string;
    phone_number: string;
  };
  setOrderContact: (orderContact: {
    full_name: string;
    phone_number: string;
  }) => void;
  newOrder: Order;
  setNewOrder: (field: string, value: string | number) => void;
}

const ChengeContactModal: React.FC<Props> = ({
  onClose,
  orderContact,
  setOrderContact,
  newOrder,
  setNewOrder,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    full_name: "",

    phone_number: "",
  });

  const validatePhoneNumber = (phoneNumber: string) => {
    return /^\d{10}$/.test(phoneNumber);
  };

  const handleUpdate = () => {
    if (orderContact.full_name.trim() === "") {
      setErrors((prevState) => ({
        ...prevState,

        full_name: "שם מלא הוא שדה חובה",
      }));
    } else if (!validatePhoneNumber(orderContact.phone_number)) {
      setErrors((prevState) => ({
        ...prevState,

        phone_number: "מספר הטלפון חייב להיות בעל 10 ספרות",
      }));
    } else {
      setOrderContact(orderContact);
      onClose();
    }
  };
  const handleHowToReceiveChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNewOrder("how_receive_shipment", e.target.value);
  };

  const handleAlternativeProductsChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNewOrder("alternative_products", e.target.value);
  };
  return (
    <div className="modal-order custome">
      <div className="modal-order-contact">
        <h2 className="contact-title">איש קשר למשלוח</h2>
        <div className="full_name">
          <label className="full-contact-name">שם מלא*</label>
          <input
            className="contact-name"
            type="text"
            value={orderContact.full_name}
            onChange={(e) =>
              setOrderContact({ ...orderContact, full_name: e.target.value })
            }
          />
          {errors.full_name && (
            <span style={{ color: "red" }}>{errors.full_name}</span>
          )}
        </div>
        <div className="phone_number">
          <label className="contact-phone-label">טלפון*</label>
          <input
            className="contact-phone"
            type="text"
            value={orderContact.phone_number}
            onChange={(e) =>
              setOrderContact({ ...orderContact, phone_number: e.target.value })
            }
          />
          {errors.phone_number && (
            <span style={{ color: "red" }}>{errors.phone_number}</span>
          )}
        </div>
      </div>
      <div className="modal-order-highlights">
        <h2 className="order-requests-title">דגשים להזמנה </h2>
        <div className="modal-order-receive">
          <label>קבלת המשלוח*</label>
          <select
            value={newOrder.how_receive_shipment}
            onChange={handleHowToReceiveChange}
          >
            <option value=" יש מישהו בבית"> יש מישהו בבית</option>
            <option value=" נא להשאיר ליד הדלת"> נא להשאיר ליד הדלת</option>
          </select>
        </div>

        <div className="modal-order-alternative">
          <label>מוצרים חלופיים*</label>
          <select
            value={newOrder.alternative_products}
            onChange={handleAlternativeProductsChange}
          >
            <option value="צרו קשר לתיאום"> צרו קשר לתיאום</option>
            <option value="עם מוצרים חלופיים ">עם מוצרים חלופיים </option>
            <option value="ללא מוצרים חלופיים ">ללא מוצרים חלופיים </option>
          </select>
        </div>
      </div>

      <div className="contact-btns">
        <RamiBtn onClick={handleUpdate}>שמירה</RamiBtn>
        <RamiBtn className="contact-cancel-btn" onClick={onClose}>
          ביטול
        </RamiBtn>
      </div>
    </div>
  );
};

export default ChengeContactModal;
