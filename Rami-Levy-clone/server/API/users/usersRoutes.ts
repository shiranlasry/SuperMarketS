//users routes server side
import express from "express";
import { getAllUsers,registerUser,loginUser,logOutUser } from "./usersCtrl";


const router = express.Router()

router
.get("", getAllUsers)
.post("/register", registerUser)
.post("/login", loginUser)
.delete("/delete-token", logOutUser);



export default router