import React, { useEffect } from 'react'
import { loggedInUserSelector } from '../../../features/logged_in_user/loggedInUserSlice';
import { useSelector } from 'react-redux';
import { ordersListSelector } from '../../../features/orders/ordersSlice';
import { useAppDispatch } from '../../../app/hook';
//import { getUserCartsApi,getUserCartsListsApi } from '../../../features/orders/ordersAPI';

const UserOrders = () => {
    const loggedInUser = useSelector(loggedInUserSelector);
    const userOrders = useSelector(ordersListSelector);
    const dispatch = useAppDispatch();
    
    // const getUserCarts = async (user_id: number) => {
    //     const response = await dispatch(getUserCartsApi(user_id));
   
    //     if (response.payload && response.payload.cart_id) {
    //       dispatch(getUserCartsListsApi(response.payload.cart_id));
    //     }

    //  }


    useEffect(() => {
        if (loggedInUser && loggedInUser.user_id){
            debugger
         //   getUserCarts(loggedInUser.user_id);
          
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