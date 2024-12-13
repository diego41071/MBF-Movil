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
  { label: "Nombre del equipo*", key: "name", type: "input" },
  { label: "Marca*", key: "brand", type: "input" },
  { label: "Modelo*", key: "model", type: "input" },
  { label: "Serial*", key: "serialNumber", type: "input" },
  { label: "Ubicación*", key: "location", type: "input" },
  { label: "Fecha de compra", key: "purchaseDate", type: "date" },
  { label: "Voltaje del equipo", key: "voltage", type: "input" },
  { label: "Potencia del equipo", key: "power", type: "input" },
  { label: "Peso aprox. del equipo", key: "weight", type: "input" },
  { label: "Capacidad", key: "capacity", type: "input" },
  { label: "Material", key: "material", type: "input" },
];

const TechnicalService: React.FC = () => {
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
          <IonTitle>Inventario</IonTitle>
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

            {/* Mostrar mensaje si no hay resultados */}
            {filteredData.length === 0 ? (
              <IonText color="danger">No se encontraron resultados</IonText>
            ) : (
              filteredData.map((item, index) => (
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
              ))
            )}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default TechnicalService;
