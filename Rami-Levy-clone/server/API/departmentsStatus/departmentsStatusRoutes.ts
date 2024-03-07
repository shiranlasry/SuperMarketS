import express from 'express';
import { addNewDepartmentStatus, deleteDepartmentStatus, getAllDepartmentsStatus, getDepartmentStatusById, updateDepartmentStatus } from './departmentsStatusCtrl';

const router = express.Router()

router
    .get("/", getAllDepartmentsStatus)
    .get("/:department_status_id", getDepartmentStatusById)
    .post("/add-department-status", addNewDepartmentStatus)
    .put("/update-department-status", updateDepartmentStatus)
    .delete("/delete-department-status", deleteDepartmentStatus)

export default router