import { Product } from "../../rami-types";
import axios from "axios";


export const addNewProductDetailes = async (product_datelis:Product) => {
    try {
        const response = await axios.post("/api/products-details/add-new-product-detailes", product_datelis);
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials addNewProductDetailes()");
        }
        alert("Product added successfully")
        
        return results.insertId;
    } catch (error) {
        console.error("Error addNewProductDetailes:", error);
        throw error;
    }

}