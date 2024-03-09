import axios from 'axios';
    //in DB: delivery_id, order_id, status_id, delivery_sinish_date(DATETIME)




export const updateUserDeliveryApi = async (order_id:number, delivery_finish_date: Date) => {
    try {
        const delivery_finish_date_string = delivery_finish_date.toString();
        const response = await axios.post('/api/deliveries/add-new-delivery', { order_id, delivery_finish_date:delivery_finish_date_string });
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error('Invalid credentials addNewDelivery()');
        }
        alert('משלוח נוצר בהצלחה');
        return results.insertId;
    } catch (error) {
        console.error('Error addNewDelivery:', error);
        throw error;
    }
}

export const updateDeliveryApi = async (delivery_id: number, delivery_finish_date: Date) => {
    try {
        const response = await axios.patch('/api/deliveries/update-delivery', { delivery_id, delivery_finish_date });
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error('Invalid credentials updateDelivery()');
        }
        alert('משלוח עודכן בהצלחה');
        return { ok, results };
    } catch (error) {
        console.error('Error updateDelivery:', error);
        return null;
    }
}

export const setCalanderForTreeDaysAPI = async () => {
    try {
        const response = await axios.get('/api/deliveries/set-calander-for-three-days');
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error('Invalid credentials setCalanderForTreeDays()');
        }
        return results;
    } catch (error) {
        console.error('Error setCalanderForTreeDays:', error);
        return null;
    }
}

