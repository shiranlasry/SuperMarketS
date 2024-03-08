import { createAsyncThunk } from "@reduxjs/toolkit";
import { Address, User } from "../../rami-types";
import axios from "axios";

interface GetUserApiArgs {
    email: string;
    password: string;
}
export const logInUserApi = createAsyncThunk<User | null, GetUserApiArgs>('get-user', async (arg) => {
    try {
        const response = await axios.post("/api/users/login", arg);
        const { ok, user } = response.data;
        if (!ok) {
            throw new Error("פרטים לא נכונים");
        }
        return user;

    } catch (error) {
        console.error(error) // this is temporary
        return null;
    }
})
export const getUserByIdApi = createAsyncThunk<User | null, number |null>('get-user-by-id', async (user_id) => {
    try {
        
        const response = await axios.get(`/api/users/${user_id}`);
        const { ok, user } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials getUserByIdApi()");
        }
        return user;

    } catch (error) {
        console.error(error) // this is temporary
        return null;
    }
})
export const updateUserPasswordApi = createAsyncThunk<User | null, {user_id:number,old_password:string,new_password:string}>('update-user-password', async (args) => {
    try {
       
        const response = await axios.patch("/api/users/update-personal-password", args);
        const { ok, user } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials updateUserPasswordApi()");
        }
        alert(" סתמו הסיסמה עודכנה בהצלחה");
        return user;

    } catch (error) {
        console.error(error) // this is temporary
        return null;
    }
})
export const logOutUserApi = createAsyncThunk('delete-token', async () => {
    try {
        const response = await axios.delete("/api/users/delete-token");
        const { ok } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials deleteTokenApi()");
        }
        return null;

    } catch (error) {
        console.error(error) // this is temporary
        return null;
    }
})
export const getUserFromTokenApi = createAsyncThunk<User | null>('get-user-from-token', async () => {
    try {

        const response = await axios.get("/api/users/user-from-token");
        const { ok, user } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials getUserFromTokenApi()");
        }
        return user;

    } catch (error) {
        console.error(error) // this is temporary
        return null;
    }
})
interface AddNewUserAddresseArgs {
    user_id:number;
    is_default:boolean;
    city_id:number;
    street_id:number;
    floor:number;
    apartment:number;
    zip_code:number;
    phone_number:string;
    address_name:string;
   
}
export const addNewUserAddressApi = createAsyncThunk<Address[] |AddNewUserAddresseArgs,Address >('add-new-user-address', async (args) => {
    try {
        
        const response = await axios.post("/api/addresses/add-new-address", args);
        const { ok, selectresult } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials addNewUserAddressApi()");
        }
        return selectresult;

    } catch (error) {
        console.error(error) // this is temporary
        return null;
    }
})
export const getUserAddressesApi = createAsyncThunk<Address[] | null, number>('get-user-addresses', async (user_id) => {
    try {
            
        const response = await axios.get(`/api/addresses/get-user-addresses/${user_id}`,{params:{user_id}});
        const { ok, result } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials getUserAddressesApi()");
        }
        return result;

    } catch (error) {
        console.error(error) // this is temporary
        return null;
    }
})