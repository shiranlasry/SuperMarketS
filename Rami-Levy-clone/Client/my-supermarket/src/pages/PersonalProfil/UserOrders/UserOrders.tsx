import React, { useEffect } from 'react'
import { loggedInUserSelector } from '../../../features/logged_in_user/loggedInUserSlice';
import { useSelector } from 'react-redux';
import { ordersListSelector } from '../../../features/orders/ordersSlice';
import { useAppDispatch } from '../../../app/hook';
import { getUserOrderCartDetailsAPI, getUserOrdersAPI } from '../../../features/orders/ordersAPI';
import { getUserActiveCartListApi } from '../../../features/cart/cartAPI';
import { Order, ProductsList } from '../../../rami-types';


const UserOrders = () => {
    const loggedInUser = useSelector(loggedInUserSelector);
    const userOrders = useSelector(ordersListSelector);
    const dispatch = useAppDispatch();
    
    const getUserOrders = async (user_id: number) => {
        
        const response = await dispatch(getUserOrdersAPI(user_id));

        debugger
        if (response.payload ) {
            const userOrders = response.payload as Order[];
            
            userOrders.forEach(async order => {
            debugger
            await dispatch(getUserOrderCartDetailsAPI(order.cart_id));
        });

     }}


    useEffect(() => {
        debugger
        if (loggedInUser && loggedInUser.user_id){
         getUserOrders(loggedInUser.user_id);
          
    }

    }
        , [loggedInUser]);
    
        useEffect(() => { 
            if(userOrders)
                console.log(userOrders)
                debugger
    
        }
            , [userOrders]);
  return (
      <div>
        <h1>Order</h1>
    
    </div>
  )
}

export default UserOrders