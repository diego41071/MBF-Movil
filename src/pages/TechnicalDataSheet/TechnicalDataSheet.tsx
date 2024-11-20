import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
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

const TechnicalService: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [data] = useState([
    { id: 1, ficha: "FT001", nombre: "Equipo A", fechaServicio: "2023-01-15" },
    { id: 2, ficha: "FT002", nombre: "Equipo B", fechaServicio: "2023-02-20" },
    { id: 3, ficha: "FT003", nombre: "Equipo C", fechaServicio: "2023-03-10" },
    { id: 4, ficha: "FT004", nombre: "Equipo D", fechaServicio: "2023-04-05" },
    { id: 5, ficha: "FT005", nombre: "Equipo E", fechaServicio: "2023-05-30" },
  ]);

  // Filtrar los datos según el texto de búsqueda
  const filteredData = data.filter(
    (item) =>
      item.ficha.toLowerCase().includes(searchText.toLowerCase()) ||
      item.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
      item.fechaServicio.includes(searchText)
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Fichas Técnicas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Campo de búsqueda */}
        <IonSearchbar
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value!)}
          placeholder="Buscar por ficha, nombre o fecha"
        />

        {/* Tabla responsiva */}
        <IonList>
          {/* Encabezados visibles solo en pantallas grandes */}
          <IonRow className="ion-hide-sm-down">
            <IonCol size="4">
              <strong>Número de Ficha Técnica</strong>
            </IonCol>
            <IonCol size="4">
              <strong>Nombre</strong>
            </IonCol>
            <IonCol size="4">
              <strong>Fecha Último Servicio</strong>
            </IonCol>
          </IonRow>

          {filteredData.length === 0 ? (
            <IonText color="danger">No se encontraron resultados</IonText>
          ) : (
            filteredData.map((item) => (
              <IonItem key={item.id} className="custom-item border-item">
                <IonRow>
                  {/* Contenido responsivo */}
                  <IonCol size="12" size-sm="4">
                    <strong className="ion-hide-sm-up">Ficha:</strong>{" "}
                    {item.ficha}
                  </IonCol>
                  <IonCol size="12" size-sm="4">
                    <strong className="ion-hide-sm-up">Nombre:</strong>{" "}
                    {item.nombre}
                  </IonCol>
                  <IonCol size="12" size-sm="4">
                    <strong className="ion-hide-sm-up">Fecha:</strong>{" "}
                    {item.fechaServicio}
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
