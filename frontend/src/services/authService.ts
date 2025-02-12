import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/auth";

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const register = async (userData: any) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};
