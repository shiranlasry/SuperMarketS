//users routes server side
import express from "express";
import { getAllUsers,updateUserDetails,updatePassword,deleteUser,registerUser,loginUser,logOutUser, getUserFromToken ,updateUserRole} from "./usersCtrl";

import { isAdmin, isAdminUserUpdate } from '../middlewares/authMiddleware';
const router = express.Router()

router
.get("",isAdmin, getAllUsers)

.post("/register", registerUser)
.post("/login", loginUser)
.delete("/delete-token", logOutUser)
.get("/user-from-token", getUserFromToken)
.put("/update-user-role",isAdmin, updateUserRole)
.delete("/:user_id",isAdminUserUpdate, deleteUser)
.put("/update-password",isAdminUserUpdate, updatePassword)
.put("/update-user-details",isAdminUserUpdate, updateUserDetails)




export default router