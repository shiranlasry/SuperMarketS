import React from "react";
import "./DeleteUserPersonal.scss";
import { User } from "../../../rami-types";
import { useAppDispatch } from "../../../app/hook";
import { deleteUserApi } from "../../../features/all_users_admin/allUsersAPI";
import { logOutUserApi } from "../../../features/logged_in_user/loggedInUserAPI";
import { useNavigate } from "react-router";

type UserProps = {
  user: User;
  onClose: () => void;
};
const DeleteUserPersonal: React.FC<UserProps> = ({ user, onClose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handelDeleteUser = async () => {
    await dispatch(deleteUserApi(user.user_id));
    dispatch(logOutUserApi());
    navigate("/");

    onClose();
  };
  return (
    <div className="delete-user">
      <h1>מחיקת משתמש</h1>
      <p>האם אתה בטוח שברצונך למחוק את המשתמש {user.email}?</p>
      <button onClick={onClose}>ביטול</button>
      <button onClick={handelDeleteUser}>אישור</button>
    </div>
  );
};

export default DeleteUserPersonal;
