import axios from "axios";

export const addNewFoodCategoryApi = async (food_category_name:string) => {
    try {
        
        const response = await axios.post("/api/categories/add-new-food-category", {food_category_name});
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials addNewProductInventories()");
        }
        alert("Product added successfully")
        
        return results.insertId;
    } catch (error) {
        console.error("Error addNewProductInventories:", error);
        throw error;
    }
}