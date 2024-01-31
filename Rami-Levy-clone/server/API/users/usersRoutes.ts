//users routes server side
import express from "express";
import { getAllUsers,registerUser } from "./usersCtrl";


const router = express.Router()

router
.get("", getAllUsers)
.post("/register", registerUser);



export default router