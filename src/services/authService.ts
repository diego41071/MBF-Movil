import axios from "axios";

export const API_URL = "http://localhost:3000/auth";

export const login = async (
  username: string,
  password: string,
  captchaToken: string
) => {
  const response = await axios.post(`${API_URL}/login`, {
    username,
    password,
    captchaToken,
  });
  return response.data;
};

export const logout = async () => {
  // Eliminar el token JWT del localStorage
  localStorage.removeItem("authToken");
  const response = await axios.post(`${API_URL}/logout`);
  return response.data;
};

// Función de registro
export const register = async (
  name: string,
  lastname: string,
  company: string,
  doc: string,
  position: string,
  username: string,
  password: string,
  confirmPassword: string,
  check: number
) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      lastname,
      company,
      doc,
      position,
      username,
      password,
      confirmPassword,
      check,
    });
    return response.data; // Devolver datos de la respuesta
  } catch (error: unknown) {
    // Cambiado a 'unknown' para TypeScript
    if (axios.isAxiosError(error)) {
      // Manejo específico para errores de Axios
      throw new Error(error.response?.data?.message || "Error en el registro");
    } else {
      // Manejo para otros tipos de errores
      throw new Error("Error inesperado. Intenta nuevamente.");
    }
  }
};

export const handleForgot = (username: string) =>
  axios.post(`${API_URL}/forgot-password`, {
    username: username,
  });

export const handleReset = (
  username: string,
  code: number,
  newPassword: string
) =>
  axios.post(`${API_URL}/reset-password`, {
    username,
    code, // Asegúrate de convertir a número
    newPassword,
  });
