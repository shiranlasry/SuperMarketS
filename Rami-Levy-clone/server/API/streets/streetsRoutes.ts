//users routes server side
import express from "express";
import { getAllStreets } from "./streetsCtrl";



const router = express.Router()

router
.get("", getAllStreets);


export default router