import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/task";

export const getTasks = async () => {
  return await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const markTaskCompleted = async (taskId: string) => {
  return await axios.put(`${API_URL}/${taskId}/complete`, {}, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
