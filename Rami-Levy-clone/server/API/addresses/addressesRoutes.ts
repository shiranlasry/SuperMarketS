//users routes server side
import express from "express";
import { addNewUserAddress,getUserAddresses ,deleteUserAddress,updateDefaultAddress} from "./addressesCtrl";
import { isAdminUserUpdate } from "../middlewares/authMiddleware";




const router = express.Router()

router
.post("/add-new-address",isAdminUserUpdate, addNewUserAddress)
.get("/get-user-addresses/:user_id",isAdminUserUpdate, getUserAddresses)
.delete("/delete-user-address/:user_id/:address_id",isAdminUserUpdate, deleteUserAddress)
.put("/update-default-address/:user_id/:address_id",isAdminUserUpdate, updateDefaultAddress)


export default router