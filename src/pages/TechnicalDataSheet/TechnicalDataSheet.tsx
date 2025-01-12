import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonText,
  IonRow,
  IonCol,
  IonSearchbar,
  IonButtons,
  IonMenuButton,
  IonSpinner,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { fetchInventory } from "../../services/inventoryService"; // Importa la función para obtener inventario
import "./TechnicalDataSheet.css";

const fields = [
  { label: "Nombre del equipo*", key: "name" },
  { label: "Marca*", key: "brand" },
  { label: "Modelo*", key: "model" },
  { label: "Serial*", key: "serialNumber" },
  { label: "Ubicación*", key: "location" },
  { label: "Fecha de compra", key: "purchaseDate", type: "date" },
  { label: "Voltaje del equipo", key: "voltage" },
  { label: "Potencia del equipo", key: "power" },
  { label: "Peso aprox. del equipo", key: "weight" },
  { label: "Capacidad", key: "capacity" },
  { label: "Material", key: "material" },
  { label: "Ficha técnica", key: "FT" },
];

const TechnicalDataSheet: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Obtener datos del backend al montar el componente
  useEffect(() => {
    const getInventory = async () => {
      try {
        const inventory = await fetchInventory();
        setData(inventory);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      } finally {
        setLoading(false);
      }
    };

    getInventory();
  }, []);

  // Filtrar los datos según el texto de búsqueda
  const filteredData = data.filter((item) =>
    fields.some((field) => {
      const value = item[field.key];
      return (
        typeof value === "string" &&
        value.toLowerCase().includes(searchText.toLowerCase())
      );
    })
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Fichas Técnicas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Campo de búsqueda */}
        <IonSearchbar
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value!)}
          placeholder="Buscar por cualquier campo"
          className="custom-input-search"
        />
        {/* Mensaje debajo del buscador */}
        {searchText.trim() && filteredData.length > 0 && (
          <IonText className="records-count">
            {filteredData.length} registro{filteredData.length !== 1 ? "s" : ""}{" "}
            encontrado{filteredData.length !== 1 ? "s" : ""}
          </IonText>
        )}
        {searchText.trim() && filteredData.length === 0 && (
          <IonText className="records-count records-count-none">
            No se encontraron resultados para "{searchText.trim()}"
          </IonText>
        )}
        {/* Muestra un loader mientras se obtienen los datos */}
        {loading ? (
          <IonSpinner name="crescent" />
        ) : (
          <IonList className="custom-list">
            {/* Encabezados visibles solo en pantallas grandes */}
            <IonRow className="ion-hide-sm-down">
              {fields.map((field) => (
                <IonCol key={field.key} size="2">
                  <strong>{field.label.replace("*", "")}</strong>
                </IonCol>
              ))}
            </IonRow>

            {filteredData.map((item, index) => (
              <IonItem key={index} className="custom-item border-item">
                <IonRow>
                  {fields.map((field) => (
                    <IonCol key={field.key} size="12" size-sm="2">
                      <strong className="ion-hide-sm-up">
                        {field.label.replace("*", "")}:
                      </strong>{" "}
                      {item[field.key]}
                    </IonCol>
                  ))}
                </IonRow>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default TechnicalDataSheet;
