import express from 'express';
import { updateDeliveryStatus, getAllDeliveries, getDeliveryById, updateDelivery, deleteDelivery } from './deliveriesCtrl';

const router = express.Router()

router
    .get("/", getAllDeliveries)
    .get("/:delivery_id", getDeliveryById)
    .post("/update-delivery-status", updateDeliveryStatus)
    .patch("/update-delivery", updateDelivery)
    .delete("/delete-delivery", deleteDelivery)
export default router
