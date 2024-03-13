import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { getOrderByIdAPI } from "../../features/orders/ordersAPI";
import { newUserOrderSelector } from "../../features/orders/ordersSlice";
import "./OrderSummary.scss";

const OrderSummary = () => {
  const { order_id } = useParams();
  const newOrder = useAppSelector(newUserOrderSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (order_id) {
      const numberOrderId = parseInt(order_id);
      dispatch(getOrderByIdAPI(numberOrderId));
    }
  }, [dispatch, order_id]);

  return (
    <div className="order-summary">
      <div className="order-summary-header">
        <h1 className="display-4">סיכום הזמנה</h1>
      </div>
      {newOrder && (
        <div className="order-summary-info">
          <p className="lead">ההזמנה בוצעה בהצלחה</p>
          <p>איש קשר: {newOrder.contact_name || ""}</p>
          <p>טלפון: {newOrder.contact_phone_number}</p>
          <p>בתאריך: {newOrder.delivery_finish_date}</p>
          <p>בשעה : {newOrder.delivery_start_time}</p>
          <p className="alert alert-warning">
            המשלוח כמובן לא יגיע כי זה אתר מזוייף של אלופים אבל אין לנו מחסן
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
