import express from 'express';
import { getAllLists, getListById, addNewList, deleteList, updateList,  } from './listsCtrl';

const router = express.Router()

router
    .get("/", getAllLists)
    .get("/:list_id", getListById)
    .post("/add-new-list", addNewList)
    .patch("/update-list", updateList)
    .delete("/delete-list", deleteList)

export default router