import axios from "axios";

export const API_URL = `${import.meta.env.VITE_API_URL}/inventory`;

/**
 * Función para obtener el inventario desde el backend.
 * @returns {Promise<any[]>} Una promesa con la lista de inventario.
 * @throws {Error} Lanza un error si la solicitud falla.
 */
export const fetchInventory = async (): Promise<any[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Devuelve los datos del inventario
  } catch (error) {
    console.error("Error fetching inventory:", error);
    throw new Error("Unable to fetch inventory");
  }
};
