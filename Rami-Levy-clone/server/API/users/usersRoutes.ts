//users routes server side
 


import express from "express";
import { getAllUsers} from "./usersCtrl";


const router = express.Router()

router
.get("", getAllUsers)

;


export default router