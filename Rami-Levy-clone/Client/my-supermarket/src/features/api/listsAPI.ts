import axios from "axios";

export const addNewList = async (product_id: number, product_amount: number) => { 
    try {
        const response = await axios.post("/api/lists/add-new-list", { product_id, product_amount });
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials addNewList()");
        }
        alert("המוצר נוסף לרשימה בהצלחה")
        return results.insertId;
    } catch (error) {
        console.error("Error addNewList:", error);
        throw error;
    }
}

export const updateListAPI = async (list_id: number, product_id: number, product_amount: number) => {
    try {
        const response = await axios.patch("/api/lists/update-list", { list_id, product_id, product_amount });
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials updateList()");
        }
        alert("המוצר עודכן בהצלחה")
        return { ok, results };
    } catch (error) {
        console.error("Error updateList:", error);
        return null;
    }
}

export const deleteListAPI = async (list_id: number) => {
    try {
        const response = await axios.delete(`/api/lists/delete-list/${list_id}`);
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials deleteList()");
        }
        alert("המוצר נמחק בהצלחה מהרשימה")
        return results.insertId;
    } catch (error) {
        console.error("Error deleteList:", error);
        return null;
    }
}

export const getAllListsApi = async () => {
    try {
        const response = await axios.get("/api/lists/");
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials getAllLists()");
        }
        return results;
    } catch (error) {
        console.error("Error getAllLists:", error);
        throw error;
    }
}

export const getListByIdAPI = async (list_id: number) => {
    try {
        const response = await axios.get(`/api/lists/${list_id}`);
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials getListById()");
        }
        return results;
    } catch (error) {
        console.error("Error getListById:", error);
        throw error;
    }
}

