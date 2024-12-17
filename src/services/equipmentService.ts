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
