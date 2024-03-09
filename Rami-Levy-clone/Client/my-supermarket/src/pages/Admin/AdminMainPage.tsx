import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
import { loggedInUserSelector } from "../../features/logged_in_user/loggedInUserSlice";
import "./AdminMainPage.scss";
import RamiBtn from "../../components/RamiBtn/RamiBtn";

const AdminMainPage = () => {
  const navigate = useNavigate();

  const loggedInUser = useAppSelector(loggedInUserSelector);
  const manageUsersPressed = () => {
    navigate("/manage_users");
  };
  const manageProductsPressed = () => {
    navigate("/manage_products");
  };

  const manageSalesPressed = () => {
    navigate("/manage_sales");
  };

  return (
    <div className="admin-main-page-container">
      <h1 className="admin-zone-title">איזור מנהלים</h1>
      {loggedInUser && (
        <h2 className="admin-greet">
          ברוך הבא בוס גדול {loggedInUser.first_name}
        </h2>
      )}

      <RamiBtn className="manage-productsBtn" onClick={manageProductsPressed}>
        נהל מוצרים
      </RamiBtn>
      <RamiBtn className="manage-usersBtn" onClick={manageUsersPressed}>
        נהל משתמשים
      </RamiBtn>
      <RamiBtn className="manage-salesBtn" onClick={manageSalesPressed}>
        נהל מבצעים
      </RamiBtn>
      <RamiBtn className="admin-backBtn" onClick={() => navigate("/")}>
        חזור
      </RamiBtn>
    </div>
  );
};

export default AdminMainPage;
