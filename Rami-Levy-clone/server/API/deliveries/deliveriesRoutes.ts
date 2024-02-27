import express from 'express';
import { addNewDelivery, getAllDeliveries, getDeliveryById, updateDelivery, deleteDelivery } from './deliveriesCtrl';

const router = express.Router()

router
    .get("/", getAllDeliveries)
    .get("/:delivery_id", getDeliveryById)
    .post("/add-new-delivery", addNewDelivery)
    .patch("/update-delivery", updateDelivery)
    .delete("/delete-delivery", deleteDelivery)
export default router
