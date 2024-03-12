import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { getOrderByIdAPI } from '../../features/orders/ordersAPI';
import { newUserOrderSelector } from '../../features/orders/ordersSlice';

const OrderSummary = () => {
    const orderId = useParams().order_id;
    const newOrder = useAppSelector(newUserOrderSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (orderId) {
            const numberOrderId = parseInt(orderId);
            dispatch(getOrderByIdAPI(numberOrderId));
        }
    }, [orderId]);
    useEffect(() => {
        if (newOrder) {
            console.log(newOrder);
            console.log(`הזמנה מספר ${newOrder.order_id} נוצרה בהצלחה`);
        }
    }, [newOrder]);

    return (
        <div>
            <h1>Order Summary</h1>
           {newOrder && 
         
           <>
             <p> הצלחה מסחררת</p>
                <p> איש קשר: {newOrder.contact_name || ""}</p>
                <p> טלפון: {newOrder.contact_phone_number}</p>
                <p> בתאריך: {newOrder.delivery_finish_date}</p>
                <p> בשעה : {newOrder.delivery_start_time}</p>
                <p>המשלוח כמובן לא יגיע כי זה אתר מזוייף של אלופים אבל אין לנו מחסן</p>
             </>
           }
           </div>
    );
}

export default OrderSummary;
