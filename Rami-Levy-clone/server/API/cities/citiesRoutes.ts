//users routes server side
import express from "express";
import { getAllCities } from "./citiesCtrl";



const router = express.Router()

router
.get("", getAllCities);


export default router