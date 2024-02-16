import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../rami-types";


export const getAllUsersApi = createAsyncThunk<User[] | null, void>('get-all-users', async () => {
    try {
        const response = await axios.get("/api/users");
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials getAllUsersApi()");
        }
       
        return results;

    } catch (error) {
        console.error(error) // this is temporary
        return null;
    }
})
interface UserUpdateRole {
    user_id: number |null;
    role_id: number | null;
}
export const updateUserRoleApi = createAsyncThunk<User[] | null,UserUpdateRole>('update-user-role', async (arg) => {
    try {
        const response = await axios.put("/api/users/update-user-role", arg);
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials updateUserRoleApi()");
        }
       
        return results;

    } catch (error) {
        console.error(error) // this is temporary
        return null;
    }
})