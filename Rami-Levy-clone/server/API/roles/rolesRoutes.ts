//users routes server side
import express from "express";
import {getAllRoles} from "./rolesCtrl";
import { isAdmin } from "../middlewares/authMiddleware";

const router = express.Router()

router
.get("", isAdmin , getAllRoles)



export default router