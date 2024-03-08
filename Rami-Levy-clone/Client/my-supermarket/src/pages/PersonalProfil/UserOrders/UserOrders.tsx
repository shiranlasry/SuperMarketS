import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../app/hook";
import { loggedInUserSelector } from "../../../features/logged_in_user/loggedInUserSlice";
import { getUserOrdersAPI } from "../../../features/orders/ordersAPI";
import { userOrdersListSelector } from "../../../features/orders/ordersSlice";
import { Order } from "../../../rami-types";
import "./user-orders.scss";
import RamiBtn from "../../../components/RamiBtn/RamiBtn";
import { useNavigate } from "react-router-dom";

const UserOrders = () => {
  const loggedInUser = useSelector(loggedInUserSelector);
  const userOrdersList = useSelector(userOrdersListSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getUserOrders = async (user_id: number) => {
    dispatch(getUserOrdersAPI(user_id));
  };
  useEffect(() => {
    if (loggedInUser && loggedInUser.user_id) {
      getUserOrders(loggedInUser.user_id);
    }
  }, []);

  useEffect(() => {
    if (userOrdersList && userOrdersList.length > 0) {
      console.log("userOrders", userOrdersList);
    }
  }, [userOrdersList]);

  const handleReturnHome = () => {
    navigate("/"); // navigate to the home page
  };

  return (
    <div className="user-orders-main">
      <h1 className="my-orders-title">ההזמנות שלי</h1>
      <img className="banana" src="./src/assets/img/banana.png" />
      <p className="no-orders-title"> נראה שעדיין לא התחלת קנייה...</p>
      <RamiBtn className="user-ordersBtn" onClick={handleReturnHome}>
        קחו אותי לסופר!
      </RamiBtn>
      {userOrdersList &&
        userOrdersList.map((order: Order) => {
          return (
            <div key={order.order_id}>
              <h3>מספר הזמנה: {order.order_id}</h3>
              <h3>תאריך הזמנה: {order.order_creation_date.toString()}</h3>
              <h3>סטטוס הזמנה: {order.status_id}</h3>
              <button>פרטי הזמנה</button>
            </div>
          );
        })}
    </div>
  );
};

export default UserOrders;
