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
export const addNewProductInventory = async (product_id:number,add:number) => {
    try {
        
        const response = await axios.post("/api/products-inventories/add-new-product-inventory", {product_id,add});
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
export const saveProductImages = async (productId: number, productImages: File[]) => {
    try {
        const formData = new FormData();
        formData.append("product_id", productId.toString());
        productImages.forEach((image) => {
            formData.append("imagesProduct", image); // Change the field name to match the Multer middleware configuration
        });
     // print the form data details
     for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

        const response = await axios.post("/api/products-images/add-new-product-images", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        const { ok, message } = response.data;
        if (!ok) {
            throw new Error(message || "Error saving product images");
        }
        alert("Product images saved successfully");
    } catch (error) {
        console.error("Error saveProductImages:", error);
        throw error;
    }
};

//get products by food category id
export const getProductDetailesBySubFoodCatagoryId = async (food_category_id: number) => {
    try {
        
        const response = await axios.get(`/api/products-details/get-products-by-sub-food-category-id/${food_category_id}`);
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials getProductDetailesById()");
        }

        return results;
    } catch (error) {
        console.error("Error getProductDetailesById:", error);
        throw error;
    }
}

