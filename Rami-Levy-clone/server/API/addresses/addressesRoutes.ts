//users routes server side
import express from "express";
import { addNewUserAddress } from "./addressesCtrl";




const router = express.Router()

router
.post("/add-new-address", addNewUserAddress)


export default router