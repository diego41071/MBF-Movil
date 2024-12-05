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
} from "@ionic/react";
import { useState } from "react";
import "./TechnicalDataSheet.css";

const fields = [
  { label: "Nombre del equipo*", key: "nombre", type: "input" },
  { label: "Marca*", key: "marca", type: "input" },
  { label: "Modelo*", key: "modelo", type: "input" },
  { label: "Serial*", key: "serial", type: "input" },
  { label: "Ubicación*", key: "ubicacion", type: "input" },
  { label: "Fecha de compra", key: "fechaCompra", type: "date" },
  { label: "Voltaje del equipo", key: "voltaje", type: "input" },
  { label: "Potencia del equipo", key: "potencia", type: "input" },
  { label: "Peso aprox. del equipo", key: "peso", type: "input" },
  { label: "Capacidad", key: "capacidad", type: "input" },
  { label: "Material", key: "material", type: "input" },
];

interface Equipment {
  id: number;
  nombre: string;
  marca: string;
  modelo: string;
  serial: string;
  ubicacion: string;
  fechaCompra: string;
  voltaje: string;
  potencia: string;
  peso: string;
  uso: string;
  capacidad: string;
  material: string;
  tecnologia: string;
  prioridad: string;
  [key: string]: string | number; // Permitir claves dinámicas
}

const TechnicalService: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [data] = useState<Equipment[]>([
    {
      id: 1,
      nombre: "Equipo A",
      marca: "Marca A",
      modelo: "Modelo A",
      serial: "Serial001",
      ubicacion: "Ubicación A",
      fechaCompra: "2023-01-15",
      voltaje: "220V",
      potencia: "50W",
      peso: "10kg",
      uso: "Fijo",
      capacidad: "5L",
      material: "Acero",
      tecnologia: "Mecánico",
      prioridad: "Alta",
    },
    {
      id: 2,
      nombre: "Equipo B",
      marca: "Marca B",
      modelo: "Modelo B",
      serial: "Serial002",
      ubicacion: "Ubicación B",
      fechaCompra: "2023-02-20",
      voltaje: "110V",
      potencia: "40W",
      peso: "8kg",
      uso: "Móvil",
      capacidad: "3L",
      material: "Plástico",
      tecnologia: "Eléctrico",
      prioridad: "Media",
    },
  ]);

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

        {/* Tabla responsiva */}
        <IonList className="custom-list">
          {/* Encabezados visibles solo en pantallas grandes */}
          <IonRow className="ion-hide-sm-down">
            {fields.map((field) => (
              <IonCol key={field.key} size="2">
                <strong>{field.label.replace("*", "")}</strong>
              </IonCol>
            ))}
          </IonRow>

          {filteredData.length === 0 ? (
            <IonText color="danger">No se encontraron resultados</IonText>
          ) : (
            filteredData.map((item) => (
              <IonItem key={item.id} className="custom-item border-item">
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
      </IonContent>
    </IonPage>
  );
};

export default TechnicalService;
