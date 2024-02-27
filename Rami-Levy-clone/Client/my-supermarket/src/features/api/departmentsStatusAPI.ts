import axios from "axios";
//in DB: department_status_id, department_status_name

export const getAllDepartmentsStatusApi = async () => {
    try {
        const response = await axios.get("/api/departments-status/");
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials getAllDepartmentsStatus()");
        }
        return results;
    } catch (error) {
        console.error("Error getAllDepartmentsStatus:", error);
        throw error;
    }
}

export const getDepartmentStatusByIdApi = async (department_status_id: number) => {
    try {
        const response = await axios.get(`/api/departments-status/${department_status_id}`);
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials getDepartmentStatusById()");
        }
        return results;
    } catch (error) {
        console.error("Error getDepartmentStatusById:", error);
        throw error;
    }
}

export const addNewDepartmentStatusApi = async (department_status_name: string) => {
    try {
        const response = await axios.post("/api/departments-status/add-new-department-status", { department_status_name });
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials addNewDepartmentStatus()");
        }
        alert("המצב נוצר בהצלחה")
        return results.insertId;
    } catch (error) {
        console.error("Error addNewDepartmentStatus:", error);
        throw error;
    }
}

export const updateDepartmentStatusApi = async (department_status_id: number, department_status_name: string) => {
    try {
        const response = await axios.patch("/api/departments-status/update-department-status", { department_status_id, department_status_name });
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials updateDepartmentStatus()");
        }
        alert("המצב עודכן בהצלחה")
        return { ok, results };
    } catch (error) {
        console.error("Error updateDepartmentStatus:", error);
        return null;
    }
}

export const deleteDepartmentStatusApi = async (department_status_id: number) => {
    try {
        const response = await axios.delete(`/api/departments-status/delete-department-status/${department_status_id}`);
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials deleteDepartmentStatus()");
        }
        alert("המצב נמחק בהצלחה")
        return results.insertId;
    } catch (error) {
        console.error("Error deleteDepartmentStatus:", error);
        return null;
    }
}

