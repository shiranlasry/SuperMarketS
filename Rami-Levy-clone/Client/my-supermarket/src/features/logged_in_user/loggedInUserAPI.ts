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
   
}
export const addNewUserAddressApi = createAsyncThunk<Address[] |AddNewUserAddresseArgs,Address >('add-new-user-address', async (args) => {
    try {
        debugger
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