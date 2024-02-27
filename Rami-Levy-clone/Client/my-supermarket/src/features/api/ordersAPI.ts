import axios from "axios";
//in DB: order_id, cart_id, user_id, delivery_id, order_creation_date(DATETIME), status_id

export const getAllOrdersApi = async () => {
    try {
        const response = await axios.get("/api/orders/");
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials getAllOrders()");
        }
        return results;
    } catch (error) {
        console.error("Error getAllOrders:", error);
        throw error;
    }
}

export const getOrderByIdApi = async (order_id: number) => {
    try {
        const response = await axios.get(`/api/orders/${order_id}`);
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials getOrderById()");
        }
        return results;
    } catch (error) {
        console.error("Error getOrderById:", error);
        throw error;
    }
}

export const addNewOrderApi = async (cart_id: number, user_id: number, delivery_id: number, order_creation_date: string, status_id: number) => {
    try {
        const response = await axios.post("/api/orders/add-new-order", { cart_id, user_id, delivery_id, order_creation_date, status_id });
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials addNewOrder()");
        }
        alert("הזמנה נוצרה בהצלחה")
        return results.insertId;
    } catch (error) {
        console.error("Error addNewOrder:", error);
        throw error;
    }
}

export const updateOrderApi = async (order_id: number, cart_id: number, user_id: number, delivery_id: number, order_creation_date: string, status_id: number) => {
    try {
        const response = await axios.patch("/api/orders/update-order", { order_id, cart_id, user_id, delivery_id, order_creation_date, status_id });
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials updateOrder()");
        }
        alert("הזמנה עודכנה בהצלחה")
        return { ok, results };
    } catch (error) {
        console.error("Error updateOrder:", error);
        return null;
    }
}

export const deleteOrderApi = async (order_id: number) => {
    try {
        const response = await axios.delete(`/api/orders/delete-order/${order_id}`);
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials deleteOrder()");
        }
        alert("הזמנה נמחקה בהצלחה")
        return results.insertId;
    } catch (error) {
        console.error("Error deleteOrder:", error);
        return null;
    }
}

