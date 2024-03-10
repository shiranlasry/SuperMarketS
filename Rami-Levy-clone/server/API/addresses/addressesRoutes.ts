//users routes server side
import express from "express";
import { addNewUserAddress,getUserAddresses ,deleteUserAddress} from "./addressesCtrl";
import { isAdminUserUpdate } from "../middlewares/authMiddleware";




const router = express.Router()

router
.post("/add-new-address",isAdminUserUpdate, addNewUserAddress)
.get("/get-user-addresses/:user_id",isAdminUserUpdate, getUserAddresses)
.delete("/delete-user-address/:user_id",isAdminUserUpdate, deleteUserAddress)


export default router