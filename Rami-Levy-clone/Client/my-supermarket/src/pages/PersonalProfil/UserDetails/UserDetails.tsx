import React, { useState } from "react";
import { useSelector } from "react-redux";
import { loggedInUserSelector } from "../../../features/logged_in_user/loggedInUserSlice";
import "./UserDetails.scss"; // Import the separate SCSS file for styling
import { updateUserDetailsApi } from "../../../features/all_users_admin/allUsersAPI";
import { useAppDispatch } from "../../../app/hook";

const UserDetails = () => {
  const loggedInUser = useSelector(loggedInUserSelector);
  const initialUserDetails = {
    user_id: loggedInUser ? loggedInUser.user_id : null,
    first_name: loggedInUser ? loggedInUser.first_name : "",
    last_name: loggedInUser ? loggedInUser.last_name : "",
    gender: loggedInUser ? loggedInUser.gender : "",
    birth_date: loggedInUser ? loggedInUser.birth_date : "",
    phone_number: loggedInUser ? loggedInUser.phone_number : "",
  };

  const [updatesFields, setUpdatesFields] = useState(initialUserDetails);
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Validate phone number if the input name is 'phone_number'
    if (name === 'phone_number') {
       // setPhoneValidation(validatePhoneNumber(value));
    }

    setUpdatesFields(prevState => ({
        ...prevState,
        [name]: name === 'birth_date' ? new Date(value).toISOString().split('T')[0] : value
    }));
};

  const updateUserDetails = async () => {
    debugger;
    await dispatch(updateUserDetailsApi(updatesFields));
  }
  return (
    <div className="user-details-container">
      <div className="user-details-title">
        <h3 className="personal-details-title">פרטים אישיים</h3>
      </div>
      {loggedInUser && (
        <div className="user-details-div">
          <div className="user-details-field">
            <input
              type="text"
              name="first_name"
              id="first_name"
              value={updatesFields.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="user-details-field">
            <input
              type="text"
              name="last_name"
              id="last_name"
              value={updatesFields.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="user-details-field">
            <input
              type="text"
              value={loggedInUser.email}
              className="not-allowed"
            />
          </div>
          <div className="user-details-field">
          <select value={updatesFields.gender} onChange={handleChange} name="gender" id="gender">
    <option value="">בחר מגדר</option>
    <option value="זכר">זכר</option>
    <option value="נקבה">נקבה</option>
</select>
          </div>
          <div className="user-details-field">
            <input
              type="date"
              name="birth_date"
              id="birth_date"
              value={updatesFields.birth_date}
              onChange={handleChange}
              required
            />
          </div>
         
          <div className="user-details-field">
            <input
              type="text"
              name="phone_number"
              id="phone_number"
              value={updatesFields.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="user-details-field">
            <button className="update-details-btn" onClick={updateUserDetails}>עדכן פרטים</button>
            <button className="delete-user-btn">מחק משתמש</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
