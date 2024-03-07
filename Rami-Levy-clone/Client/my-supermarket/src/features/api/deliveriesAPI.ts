import axios from 'axios';
    //in DB: delivery_id, order_id, status_id, delivery_sinish_date(DATETIME)

export const getAllDeliveriesApi = async () => {
    try {
        const response = await axios.get('/api/deliveries/');
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error('Invalid credentials getAllDeliveries()');
        }
        return results;
    } catch (error) {
        console.error('Error getAllDeliveries:', error);
        throw error;
    }
}

export const getDeliveryByIdApi = async (delivery_id: number) => {
    try {
        const response = await axios.get(`/api/deliveries/${delivery_id}`);
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error('Invalid credentials getDeliveryById()');
        }
        return results;
    } catch (error) {
        console.error('Error getDeliveryById:', error);
        throw error;
    }
}

export const addNewDeliveryApi = async (order_id:number, delivery_finish_date: Date) => {
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

export const deleteDeliveryApi = async (delivery_id: number) => {
    try {
        const response = await axios.delete(`/api/deliveries/delete-delivery/${delivery_id}`);
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error('Invalid credentials deleteDelivery()');
        }
        alert('משלוח נמחק בהצלחה');
        return results.insertId;
    } catch (error) {
        console.error('Error deleteDelivery:', error);
        return null;
    }
}


