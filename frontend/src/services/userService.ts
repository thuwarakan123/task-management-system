import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/user";

export const getUsers = async () => {
  return await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const createUser = async (userData: any) => {
  return await axios.post(API_URL, userData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const updateUser = async (userId: string, updateData: any) => {
  return await axios.put(`${API_URL}/${userId}`, updateData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const deleteUser = async (userId: string) => {
  return await axios.delete(`${API_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
