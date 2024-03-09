import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { updateUserDetailsApi } from "../../../features/all_users_admin/allUsersAPI";
import { getUserByIdApi } from "../../../features/logged_in_user/loggedInUserAPI";
import { loggedInUserSelector } from "../../../features/logged_in_user/loggedInUserSlice";
import DeleteUserPersonal from "../DeleteUser/DeleteUserPersonal";
import UpdateUserPassword from "../UpdateUserPassword/UpdateUserPassword";
import "./UserDetails.scss"; // Import the separate SCSS file for styling
import { validate } from "uuid";

const UserDetails = () => {
  const loggedInUser = useAppSelector(loggedInUserSelector);
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
  const [isPopChangePassword, setIsPopChangePassword] = useState(false);
  const popDeleteUser = () => {
    setIsPopDelete(true);
  };
  const popChangePassword = () => {
    setIsPopChangePassword(true);
  };
  const dispatch = useAppDispatch();


  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Validate phone number if the input name is 'phone_number'
    // if (name === "phone_number") {
    //   phoneValidation(validatePhoneNumber(value));
    // }

    setUpdatesFields((prevState) => ({
      ...prevState,
      [name]:
        name === "birth_date"
          ? new Date(value).toISOString().split("T")[0]
          : value,
    }));
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^0([2-4689]|5\d|6\d)(-?\d{7})$/;
    if (!phoneRegex.test(phone)) {
      alert("מספר טלפון לא תקין");
      return false;
    }
    return true;
  };  

  const validateAge = (date: string) => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      alert("אתה צעיר מדי להיות משתמש באתר, השימוש באתר מגיל 18");
      return false;
    }
    return true;
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
    if (validatePhoneNumber(updatesFields.phone_number) && validateAge(updatesFields.birth_date)) {
      await dispatch(updateUserDetailsApi(updatesFields));
      dispatch(getUserByIdApi(updatesFields.user_id));
    }
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
                  className="form-check-input"
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
                  className="form-check-input"
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
                className="form-check-input"
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
            <Modal
              id={"modal-Delete-user"}
              show={isPopDelete}
              onHide={() => setIsPopDelete(false)}
              dialogClassName="custom-modal"
            >
              <Modal.Body>
                <DeleteUserPersonal
                  user={loggedInUser}
                  onClose={() => setIsPopDelete(false)}
                />
              </Modal.Body>
            </Modal>
          )}
          {isPopChangePassword && (
            <Modal
              id={"modal-update-password"}
              show={isPopChangePassword}
              onHide={() => setIsPopChangePassword(false)}
              dialogClassName="custom-modal"
            >
              <Modal.Body>
                <UpdateUserPassword
                  user={loggedInUser}
                  onClose={() => setIsPopChangePassword(false)}
                />
              </Modal.Body>
            </Modal>
          )}

          <div className="uprofile-btns">
            <button className="update-details-btn" onClick={updateUserDetails}>
              עדכן פרטים
            </button>
            <button className="update-details-btn" onClick={popChangePassword}>
              שינוי סיסמא
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
