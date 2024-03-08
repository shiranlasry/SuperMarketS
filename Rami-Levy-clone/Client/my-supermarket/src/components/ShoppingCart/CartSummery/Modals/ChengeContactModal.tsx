import React, { useState } from "react";

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
  selectedHowToReceive: string;
  setSelectedHowToReceive: (value: string) => void;
  selectedAlternativeProducts: string;
  setSelectedAlternativeProducts: (value: string) => void;
}

const ChengeContactModal: React.FC<Props> = ({
  onClose,
  orderContact,
  setOrderContact,
  selectedHowToReceive,
  setSelectedHowToReceive,
  selectedAlternativeProducts,
  setSelectedAlternativeProducts,
}) => {
  const [updatedContact, setUpdatedContact] = useState({ ...orderContact });
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    full_name: "",

    phone_number: "",
  });

  const validatePhoneNumber = (phoneNumber: string) => {
    return /^\d{10}$/.test(phoneNumber);
  };

  const handleUpdate = () => {
    if (updatedContact.full_name.trim() === "") {
      setErrors((prevState) => ({
        ...prevState,
        full_name: "שם מלא הוא שדה חובה",
      }));
    } else if (!validatePhoneNumber(updatedContact.phone_number)) {
      setErrors((prevState) => ({
        ...prevState,
        phone_number: "מספר הטלפון חייב להיות בעל 10 ספרות",
      }));
    } else {
      setOrderContact(updatedContact);
      onClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setUpdatedContact({ ...updatedContact, [field]: e.target.value });
    if (errors[field]) {
      setErrors((prevState) => ({ ...prevState, [field]: "" }));
    }
  };
  const handleHowToReceiveChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedHowToReceive(e.target.value);
  };

  const handleAlternativeProductsChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedAlternativeProducts(e.target.value);
  };
  return (
    <div className="modal-order">
      <div className="modal-order-contact">
        <h2>איש קשר למשלוח</h2>
      <div className="full_name">
          <label>שם מלא</label>
          <input
            type="text"
            value={updatedContact.full_name}
            onChange={(e) => handleChange(e, "full_name")}
          />
          {errors.full_name && (
            <span style={{ color: "red" }}>{errors.full_name}</span>
          )}
        </div>
        <div className="phone_number">
          <label>טלפון</label>
          <input
            type="text"
            value={updatedContact.phone_number}
            onChange={(e) => handleChange(e, "phone_number")}
          />
          {errors.phone_number && (
            <span style={{ color: "red" }}>{errors.phone_number}</span>
          )}
        </div>
      </div>
        <div className="modal-order-highlights">
            <h2>דגשים להזמנה </h2>
        <div className="modal-order-receive">
          <label>קבלת המשלוח*</label>
          <select
            value={selectedHowToReceive}
            onChange={handleHowToReceiveChange}
          >
            <option value=" יש מישהו בבית"> יש מישהו בבית</option>
            <option value=" נא להשאיר ליד הדלת"> נא להשאיר ליד הדלת</option>
          </select>
        </div>
        
        <div className="modal-order-alternative">
          <label>מוצרים חלופיים*</label>
          <select
            value={selectedAlternativeProducts}
            onChange={handleAlternativeProductsChange}
          >
            <option value="צרו קשר לתיאום"> צרו קשר לתיאום</option>
            <option value="עם מוצרים חלופיים ">עם מוצרים חלופיים </option>
            <option value="ללא מוצרים חלופיים ">ללא מוצרים חלופיים </option>
          </select>
        </div>
        </div>
       
      
      <button onClick={handleUpdate}>שמירה</button>
      <button onClick={onClose}>ביטול</button>
    </div>
  );
};

export default ChengeContactModal;
