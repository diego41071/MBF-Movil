import axios from "axios";

export const API_URL = `${import.meta.env.VITE_API_URL}/equipment`;

export const getEquipment = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // La respuesta debe ser un arreglo de equipos
  } catch (error) {
    console.error("Error al obtener los equipos:", error);
    throw error;
  }
};

// Función para enviar los datos del formulario
export const submitTechnicalServiceRequest = async (data: {
  name: string;
  brand: string;
  model: string;
  serial: string;
  issue: string;
  photo?: string | null;
}) => {
  try {
    const response = await axios.post(`${API_URL}`, data);
    return response.data; // Devuelve la respuesta del backend
  } catch (error) {
    console.error("Error while sending the request:", error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};
