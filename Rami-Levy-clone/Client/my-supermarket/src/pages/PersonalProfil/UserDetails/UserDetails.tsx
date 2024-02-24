import React, { useState } from "react";
import { useSelector } from "react-redux";
import { loggedInUserSelector } from "../../../features/logged_in_user/loggedInUserSlice";
import "./UserDetails.scss"; // Import the separate SCSS file for styling
import { updateUserDetailsApi } from "../../../features/all_users_admin/allUsersAPI";
import { useAppDispatch } from "../../../app/hook";
import DeleteUser from "../DeleteUser/DeleteUserPersonal";
import DeleteUserPersonal from "../DeleteUser/DeleteUserPersonal";
import { getUserByIdApi } from "../../../features/logged_in_user/loggedInUserAPI";

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
  const [isPopDelete, setIsPopDelete] = useState(false);
  const popDeleteUser = () => {
    setIsPopDelete(true);
  };
  const dispatch = useAppDispatch();
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Validate phone number if the input name is 'phone_number'
    if (name === "phone_number") {
      // setPhoneValidation(validatePhoneNumber(value));
    }

    setUpdatesFields((prevState) => ({
      ...prevState,
      [name]:
        name === "birth_date"
          ? new Date(value).toISOString().split("T")[0]
          : value,
    }));
  };

  const updateUserDetails = async () => {
    if (
      !updatesFields.first_name ||
      !updatesFields.last_name ||
      !updatesFields.gender ||
      !updatesFields.birth_date ||
      !updatesFields.phone_number
    ) {
      alert("אנא מלא את כל השדות");
      return;
    }
    await dispatch(updateUserDetailsApi(updatesFields));
    dispatch(getUserByIdApi(updatesFields.user_id));
  };
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
              placeholder="מספר טלפון"
              value={updatesFields.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div className="user-details-field">
            <input
              type="text"
              name="another_number"
              id="another_number"
              placeholder="טלפון נוסף"
            />
          </div> */}
          <div className="set-gender">
            <div className="gender-title">
              <label>אני</label>
            </div>
            <div className="choose-gender">
              <div className="gender">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="זכר"
                  checked={updatesFields.gender === "זכר"}
                  onChange={handleChange}
                />
                <label htmlFor="male">זכר</label>
              </div>
              <div className="gender">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="נקבה"
                  checked={updatesFields.gender === "נקבה"}
                  onChange={handleChange}
                />
                <label htmlFor="female">נקבה</label>
              </div>
            </div>
            <div className="no-gender">
              <input
                type="radio"
                id="female"
                name="gender"
                value="לא משנה"
                checked={updatesFields.gender === "לא משנה"}
                onChange={handleChange}
              />
              <label htmlFor="female">לא משנה</label>
            </div>
          </div>
          {isPopDelete && (
            <DeleteUserPersonal
              user={loggedInUser}
              onClose={() => setIsPopDelete(false)}
            />
          )}
          <div className=" uprofile-btns">
            <button className="update-details-btn" onClick={updateUserDetails}>
              עדכן פרטים
            </button>
            <button className="remove-user-btn" onClick={popDeleteUser}>
              הסרת משתמש
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
