//users routes server side
import express from "express";
import { getAllUsers,updatePassword,deleteUser,registerUser,loginUser,logOutUser, getUserFromToken ,updateUserRole} from "./usersCtrl";

import { isAdmin } from '../middlewares/authMiddleware';
const router = express.Router()

router
.get("",isAdmin, getAllUsers)

.post("/register", registerUser)
.post("/login", loginUser)
.delete("/delete-token", logOutUser)
.get("/user-from-token", getUserFromToken)
.put("/update-user-role",isAdmin, updateUserRole)
.delete("/:user_id",isAdmin, deleteUser)
.put("/update-password",isAdmin, updatePassword)



export default router