import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/task"; 

export const getAllTasks = async () => {
  return await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const getUserTasks = async () => {
  return await axios.get(`${API_URL}/user`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const createTask = async (taskData: any) => {
  return await axios.post(API_URL, taskData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const updateTask = async (taskId: string, updatedData: any) => {
  return await axios.put(`${API_URL}/${taskId}`, updatedData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const deleteTask = async (taskId: string) => {
  return await axios.delete(`${API_URL}/${taskId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const markTaskCompleted = async (taskId: string) => {
  return await axios.put(`${API_URL}/${taskId}/complete`, {}, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
