import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
import { loggedInUserSelector } from "../../features/logged_in_user/loggedInUserSlice";
import "./AdminMainPage.scss";

const AdminMainPage = () => {
  const navigate = useNavigate();

  const loggedInUser = useAppSelector(loggedInUserSelector);
  const manageUsersPressed = () => {
    navigate("/manage_users");
  };
  const manageProductsPressed = () => {
    navigate("/manage_products");
  };

  return (
    <div className="admin-main-page-container">
      <h1 className="admin-zone-title">איזור מנהלים</h1>
      {loggedInUser && (
        <h2 className="admin-greet">
          ברוך הבא בוס גדול {loggedInUser.first_name}
        </h2>
      )}

      <button className="manage-productsBtn" onClick={manageProductsPressed}>
        נהל מוצרים
      </button>
      <button className="manage-usersBtn" onClick={manageUsersPressed}>
        נהל משתמשים
      </button>
      <button className="admin-backBtn" onClick={() => navigate("/")}>
        חזור
      </button>
    </div>
  );
};

export default AdminMainPage;
