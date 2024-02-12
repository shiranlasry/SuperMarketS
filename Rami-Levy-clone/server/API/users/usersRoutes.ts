//users routes server side
import express from "express";
import { getAllUsers,registerUser,loginUser,logOutUser, getUserFromToken } from "./usersCtrl";

import { isAdmin } from '../middlewares/authMiddleware';
const router = express.Router()

router
.get("",isAdmin, getAllUsers)
.post("/register", registerUser)
.post("/login", loginUser)
.delete("/delete-token", logOutUser)
.get("/user-from-token", getUserFromToken)



export default router