//users routes server side
import express from "express";
import { addNewUserAddress,getUserAddresses } from "./addressesCtrl";
import { isAdminUserUpdate } from "../middlewares/authMiddleware";




const router = express.Router()

router
.post("/add-new-address",isAdminUserUpdate, addNewUserAddress)
.get("/get-user-addresses/:user_id",isAdminUserUpdate, getUserAddresses)


export default router