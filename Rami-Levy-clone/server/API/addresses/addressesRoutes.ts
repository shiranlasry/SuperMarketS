//users routes server side
import express from "express";
import { addNewUserAddress,getUserAddresses } from "./addressesCtrl";




const router = express.Router()

router
.post("/add-new-address", addNewUserAddress)
.get("/get-user-addresses/:user_id", getUserAddresses)


export default router