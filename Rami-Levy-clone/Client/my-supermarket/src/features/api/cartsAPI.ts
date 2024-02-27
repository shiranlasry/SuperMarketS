import axios from "axios";

export const addNewCartAPI = async (list_id: number, user_id: number, status_id: number) => { 
    try {
        const response = await axios.post("/api/carts/add-new-cart", { list_id, user_id, status_id });
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials addNewCart()");
        }
        alert("הסל נוצר בהצלחה")
        return results.insertId;
    } catch (error) {
        console.error("Error addNewCart:", error);
        throw error;
    }
}

export const updateCartAPI = async (cart_id: number, status_id: number, user_id:number, list_id:number) => {
    try {
        const response = await axios.patch("/api/carts/update-cart", { cart_id, status_id, user_id, list_id });
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials updateCart()");
        }
        alert("הסל עודכן בהצלחה")
        return { ok, results };
    } catch (error) {
        console.error("Error updateCart:", error);
        return null;
    }
}

export const deleteCartAPI = async (cart_id: number) => {
    try {
        const response = await axios.delete(`/api/carts/delete-cart/${cart_id}`);
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials deleteCart()");
        }
        alert("הסל נמחק בהצלחה")
        return results.insertId;
    } catch (error) {
        console.error("Error deleteCart:", error);
        return null;
    }
}

export const getAllCartsApi = async () => {
    try {
        const response = await axios.get("/api/carts/");
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials getAllCarts()");
        }
        return results;
    } catch (error) {
        console.error("Error getAllCarts:", error);
        throw error;
    }
}

export const getCartByIdApi = async (cart_id: number) => {
    try {
        const response = await axios.get(`/api/carts/${cart_id}`);
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials getCartById()");
        }
        return results;
    } catch (error) {
        console.error("Error getCartById:", error);
        throw error;
    }
}

