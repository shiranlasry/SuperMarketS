// register axios request
import axios from "axios";
import { User } from "../rami-types";

 export const registerAPI = async (user:User) => {
  try {
    debugger    
    // Assuming your registration endpoint is /api/register
    const response = await axios.post("/api/users/register", user);

    // Assuming the server returns some data upon successful registration
    const responseData = response.data;
    // You can handle the response data or perform additional actions here

    console.log("Registration successful:", responseData);

    return responseData; // You may return the response data if needed
  } catch (error) {
    // Handle error
    console.error("Error registering user:", error);
    throw error; // Rethrow the error to handle it in the calling code if needed
  }
};

export default registerAPI;
