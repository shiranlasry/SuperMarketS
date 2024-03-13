import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//in DB: status_id, department_status_id, department_status_name

export const getAllStatusesApi = async () => {
  try {
    const response = await axios.get("/api/status/");
    const { ok, results } = response.data;
    if (!ok) {
      throw new Error("Invalid credentials getAllStatuses()");
    }
    return results;
  } catch (error) {
    console.error("Error getAllStatuses:", error);
    throw error;
  }
};

export const getStatusByIdApi = async (status_id: number) => {
  try {
    const response = await axios.get(`/api/status/${status_id}`);
    const { ok, results } = response.data;
    if (!ok) {
      throw new Error("Invalid credentials getStatusById()");
    }
    return results;
  } catch (error) {
    console.error("Error getStatusById:", error);
    throw error;
  }
};

export const addNewStatusApi = async (
  department_status_id: number,
  department_status_name: string
) => {
  try {
    const response = await axios.post("/api/status/add-new-status", {
      department_status_id,
      department_status_name,
    });
    const { ok, results } = response.data;
    if (!ok) {
      throw new Error("Invalid credentials addNewStatus()");
    }
    toast.success("המצב נוצר בהצלחה");
    return results.insertId;
  } catch (error) {
    console.error("Error addNewStatus:", error);
    throw error;
  }
};

export const updateStatusApi = async (
  status_id: number,
  department_status_id: number,
  department_status_name: string
) => {
  try {
    const response = await axios.patch("/api/status/update-status", {
      status_id,
      department_status_id,
      department_status_name,
    });
    const { ok, results } = response.data;
    if (!ok) {
      throw new Error("Invalid credentials updateStatus()");
    }
    toast.success("המצב עודכן בהצלחה");
    return { ok, results };
  } catch (error) {
    console.error("Error updateStatus:", error);
    return null;
  }
};

export const deleteStatusApi = async (status_id: number) => {
  try {
    const response = await axios.delete(
      `/api/status/delete-status/${status_id}`
    );
    const { ok, results } = response.data;
    if (!ok) {
      throw new Error("Invalid credentials deleteStatus()");
    }
    toast.success("המצב נמחק בהצלחה");
    return results.insertId;
  } catch (error) {
    console.error("Error deleteStatus:", error);
    return null;
  }
};
