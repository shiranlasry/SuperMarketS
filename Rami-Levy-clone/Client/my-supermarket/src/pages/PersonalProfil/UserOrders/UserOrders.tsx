import React, { useEffect } from 'react'
import { loggedInUserSelector } from '../../../features/logged_in_user/loggedInUserSlice';
import { useSelector } from 'react-redux';
import { ordersListSelector, userOrdersListSelector } from '../../../features/orders/ordersSlice';
import { useAppDispatch } from '../../../app/hook';
import { getUserOrderCartDetailsAPI, getUserOrdersAPI } from '../../../features/orders/ordersAPI';

import { Order } from '../../../rami-types';


const UserOrders = () => {
    const loggedInUser = useSelector(loggedInUserSelector);
    const userOrdersList = useSelector(userOrdersListSelector);
    const dispatch = useAppDispatch();
    
    const getUserOrders = async (user_id: number) => {
         dispatch(getUserOrdersAPI(user_id));
      
    }
    useEffect(() => {
        if (loggedInUser && loggedInUser.user_id){
         getUserOrders(loggedInUser.user_id);
          
    }

    }
        , []);

    useEffect(() => {
        if (userOrdersList && userOrdersList.length > 0) {
           console.log("userOrders", userOrdersList);
        }
    },[userOrdersList])


  return (
      <div>
        <h1>ההזמנות שלי</h1>
        {
            userOrdersList && userOrdersList.map((order: Order) => {
                return (
                    <div key={order.order_id}>
                        <h3>מספר הזמנה: {order.order_id}</h3>
                        <h3>תאריך הזמנה: {order.order_creation_date.toString()}</h3>
                        <h3>סטטוס הזמנה: {order.status_id}</h3>
                        <button >פרטי הזמנה</button>
                    </div>
                )
            })
        }
    
    </div>
  )
}

export default UserOrders