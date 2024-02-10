import express from "express";
import { getAllNavBarItems } from "./navbarCtrl";


const router = express.Router()

router
.get('/', getAllNavBarItems)

export default router