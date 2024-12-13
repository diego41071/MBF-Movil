import axios from "axios";

export const API_URL = `${import.meta.env.VITE_API_URL}/inventory`;

export const fetchInventory = async (): Promise<any[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Devuelve los datos del inventario
  } catch (error) {
    console.error("Error fetching inventory:", error);
    throw new Error("Unable to fetch inventory");
  }
};

// Función para guardar un equipo
export const saveEquipment = async (equipment: {
  name: string;
  brand: string;
  model: string;
  serialNumber: string;
  location: string;
  purchaseDate?: string;
  voltage?: string;
  power?: string;
  weight?: string;
  capacity?: string;
  material?: string;
  usage?: string;
  technology?: string;
  maintenancePriority?: string;
}): Promise<void> => {
  try {
    const response = await axios.post(API_URL, equipment);
    console.log("Equipo guardado exitosamente:", response.data);
  } catch (error) {
    console.error("Error al guardar el equipo:");
    throw error;
  }
};
