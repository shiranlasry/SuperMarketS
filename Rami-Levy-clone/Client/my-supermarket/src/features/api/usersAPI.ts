// register axios request
import axios from "axios";
import { User } from "../../rami-types";

 export const registerAPI = async (user:User) => {
  try {    
    // Assuming your registration endpoint is /api/register
    const response = await axios.post("/api/users/register", user);
    const responseData = response.data;
   
    return responseData; // You may return the response data if needed
  } catch (error) {
    // Handle error
    console.error("Error registering user:", error);
    throw error; // Rethrow the error to handle it in the calling code if needed
  }
};

export default registerAPI;
