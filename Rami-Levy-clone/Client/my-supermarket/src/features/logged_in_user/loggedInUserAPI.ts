import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../rami-types";
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