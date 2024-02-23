import React, { useState } from "react";
import { useSelector } from "react-redux";
import { loggedInUserSelector } from "../../../features/logged_in_user/loggedInUserSlice";
import "./UserDetails.scss"; // Import the separate SCSS file for styling

const UserDetails = () => {
  const loggedInUser = useSelector(loggedInUserSelector);
  const initialUserDetails = {
    first_name: loggedInUser ? loggedInUser.first_name : "",
    last_name: loggedInUser ? loggedInUser.last_name : "",
  };

  const [updatesFields, setUpdatesFields] = useState(initialUserDetails);
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setUpdatesFields({ ...updatesFields, [name]: value });
  };
  return (
    <div className="user-details-container">
      <div className="user-details-title">
        <h3 className="personal-details-title">פרטים אישיים</h3>
      </div>
      {loggedInUser && (
        <form className="user-details-form">
          <div className="user-details-field">
            <input
              type="text"
              name="first_name"
              id="first_name"
              value={updatesFields.first_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="user-details-field">
            <input
              type="text"
              name="last_name"
              id="last_name"
              value={updatesFields.last_name}
              onChange={handleInputChange}
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
            <input type="submit" value="עדכון פרטים" />
          </div>
          {/* <div className="user-details-field">
                        <label>מספר טלפון:</label>
                        <input type="text" value={loggedInUser.phone_number} disabled />
                    </div> */}
        </form>
      )}
    </div>
  );
};

export default UserDetails;
