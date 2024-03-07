import express from 'express';
import { getStatusById, getAllStatuses, updateStatus, addNewStatus, deleteStatus } from './statusCtrl';

const router = express.Router()

router
    .get("/", getAllStatuses)
    .get("/:status_id", getStatusById)
    .patch("/update-status", updateStatus)
    .post("/add-new-status", addNewStatus)
    .delete("/delete-status", deleteStatus)

export default router