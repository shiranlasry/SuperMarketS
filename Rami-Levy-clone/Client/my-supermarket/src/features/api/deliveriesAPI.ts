import axios from 'axios';
   

export const updateDeliveryStatusApi = async (delivery_id: number) => {
    try {
        
        const response = await axios.post('/api/deliveries/update-delivery-status', { delivery_id });
        const { ok, results } = response.data;
        
        if (!ok) {
            throw new Error('Invalid credentials addNewDelivery()');
        }
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
        return { ok, results };
    } catch (error) {
        console.error('Error updateDelivery:', error);
        return null;
    }
}



