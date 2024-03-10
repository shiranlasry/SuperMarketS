//users routes server side
import express from "express";
import { addNewContact } from './usersContactsCtrl';


import { isAdmin, isAdminUserUpdate } from '../middlewares/authMiddleware';
const router = express.Router()

router
.post("/add-new-user-contact", addNewContact)




export default router