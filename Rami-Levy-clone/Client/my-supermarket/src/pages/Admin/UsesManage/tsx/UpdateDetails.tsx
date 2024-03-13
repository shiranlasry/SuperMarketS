import React, { useState } from "react";
import { useAppDispatch } from "../../../../app/hook";
import {
  getAllUsersApi,
  updateUserDetailsApi,
} from "../../../../features/all_users_admin/allUsersAPI";
import { User } from "../../../../rami-types";
import "../scss/UpdateDetails.scss";

type UserProps = {
  user: User;
  onClose: () => void;
};

const UpdateDetails: React.FC<UserProps> = ({ user, onClose }) => {
  const initialUserDetailsState = {
    user_id: user.user_id,
    first_name: user.first_name,
    last_name: user.last_name,
    phone_number: user.phone_number,
    gender: user.gender,
    birth_date: user.birth_date, // Assuming user.birth_date is already a string
  };
  const dispatch = useAppDispatch();
  const [userDetails, setUserDetails] = useState(initialUserDetailsState);
  const [phoneValidation, setPhoneValidation] = useState<string | null>(null);
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Validate phone number if the input name is 'phone_number'
    if (name === "phone_number") {
      setPhoneValidation(validatePhoneNumber(value));
    }

    setUserDetails((prevState) => ({
      ...prevState,
      [name]:
        name === "birth_date"
          ? new Date(value).toISOString().split("T")[0]
          : value,
    }));
  };
  const validatePhoneNumber = (phoneNumber: string) => {
    // Use a regular expression to validate the phone number format
    const regex = /^0([2-4689]|5\d|6\d)(-?\d{7})$/;
    if (regex.test(phoneNumber)) {
      return null; // Return null if the phone number is valid
    } else {
      return "מספר הטלפון חייב להכיל 10 ספרות"; // Return an error message if the phone number is invalid
    }
  };
  const handelUpdateUserDetails = async () => {
    try {
      if (phoneValidation) return; // If the phone number is invalid, do nothing
      await dispatch(updateUserDetailsApi(userDetails));
      dispatch(getAllUsersApi());
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="update-details">
      {" "}
      {/* This div is not styled in the original code */}
      <h1>עריכת פרטים</h1>
      <div>
        <h3>{user.email}</h3>
        <label htmlFor="first_name">שם פרטי:</label>
        <input
          type="text"
          id="first_name"
          placeholder={user.first_name}
          onChange={handleChange}
          name="first_name"
        />
        <label htmlFor="last_name">שם משפחה:</label>
        <input
          type="text"
          id="last_name"
          placeholder={user.last_name}
          onChange={handleChange}
          name="last_name"
        />
        {/* gender */}
        <label htmlFor="gender">מגדר:</label>
        <select
          value={userDetails.gender}
          onChange={handleChange}
          name="gender"
          id="gender"
        >
          <option value="">בחר מגדר</option>
          <option value="זכר">זכר</option>
          <option value="נקבה">נקבה</option>
        </select>
        <label htmlFor="phone_number">מספר טלפון:</label>
        <input
          type="text"
          id="phone_number"
          placeholder={user.phone_number}
          onChange={handleChange}
          name="phone_number"
        />
        {phoneValidation && (
          <div className="error-message">{phoneValidation}</div>
        )}
        <label htmlFor="birth_date">תאריך לידה:</label>
        <input
          type="date"
          id="birth_date"
          value={userDetails.birth_date}
          onChange={handleChange}
          name="birth_date"
        />
        <button onClick={handelUpdateUserDetails}>עדכן</button>
        <button onClick={onClose}>בטל</button>
      </div>
    </div>
  );
};

export default UpdateDetails;
