import axios from "axios";

const API_URL = "http://localhost:3000/auth";

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
};

export const logout = async () => {
  // Eliminar el token JWT del localStorage
  localStorage.removeItem("authToken");
  const response = await axios.post(`${API_URL}/logout`);
  return response.data;
};
