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
} from "@ionic/react";
import { useState } from "react";
import "./TechnicalDataSheet.css";

const TechnicalService: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [data] = useState([
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
  const filteredData = data.filter(
    (item) =>
      item.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
      item.marca.toLowerCase().includes(searchText.toLowerCase()) ||
      item.serial.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inventario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Campo de búsqueda */}
        <IonSearchbar
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value!)}
          placeholder="Buscar por nombre, marca o serial"
          className="custom-input-search"
        />

        {/* Tabla responsiva */}
        <IonList className="custom-list">
          {/* Encabezados visibles solo en pantallas grandes */}
          <IonRow className="ion-hide-sm-down">
            <IonCol size="2">
              <strong>Nombre</strong>
            </IonCol>
            <IonCol size="2">
              <strong>Marca</strong>
            </IonCol>
            <IonCol size="2">
              <strong>Modelo</strong>
            </IonCol>
            <IonCol size="2">
              <strong>Serial</strong>
            </IonCol>
            <IonCol size="2">
              <strong>Voltaje</strong>
            </IonCol>
            <IonCol size="2">
              <strong>Prioridad</strong>
            </IonCol>
          </IonRow>

          {filteredData.length === 0 ? (
            <IonText color="danger">No se encontraron resultados</IonText>
          ) : (
            filteredData.map((item) => (
              <IonItem key={item.id} className="custom-item border-item">
                <IonRow>
                  {/* Contenido responsivo */}
                  <IonCol size="12" size-sm="2">
                    <strong className="ion-hide-sm-up">Nombre:</strong>{" "}
                    {item.nombre}
                  </IonCol>
                  <IonCol size="12" size-sm="2">
                    <strong className="ion-hide-sm-up">Marca:</strong>{" "}
                    {item.marca}
                  </IonCol>
                  <IonCol size="12" size-sm="2">
                    <strong className="ion-hide-sm-up">Modelo:</strong>{" "}
                    {item.modelo}
                  </IonCol>
                  <IonCol size="12" size-sm="2">
                    <strong className="ion-hide-sm-up">Serial:</strong>{" "}
                    {item.serial}
                  </IonCol>
                  <IonCol size="12" size-sm="2">
                    <strong className="ion-hide-sm-up">Voltaje:</strong>{" "}
                    {item.voltaje}
                  </IonCol>
                  <IonCol size="12" size-sm="2">
                    <strong className="ion-hide-sm-up">Prioridad:</strong>{" "}
                    {item.prioridad}
                  </IonCol>
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
