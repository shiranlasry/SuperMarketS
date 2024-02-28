import axios from "axios";

export const getProductPrice = async (product_id: number) => {
  try {
    const response = await axios.get(`/api/products/get-product-price/${product_id}`);
    const { ok, results } = response.data;
    if (!ok) {
      throw new Error("Invalid credentials getAllUsersApi()");
    }

    return results[0].product_price;
  } catch (error) {
    console.error(error);
    return null;
  }
}