import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonItem,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";
import "./Report.css";

interface Equipment {
  id: number;
  name: string;
  brand: string;
  model: string;
  serial: string;
  issue: string;
  photo?: string; // URL o base64 de la imagen
}

const Report: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [equipmentList] = useState<Equipment[]>([
    {
      id: 1,
      name: "Impresora",
      brand: "HP",
      model: "LaserJet Pro",
      serial: "12345ABC",
      issue: "No imprime",
      photo: "https://via.placeholder.com/50", // URL de la imagen
    },
    {
      id: 2,
      name: "Computadora",
      brand: "Dell",
      model: "Inspiron 15",
      serial: "67890XYZ",
      issue: "Pantalla azul",
      photo: "https://via.placeholder.com/50", // URL de la imagen
    },
    {
      id: 3,
      name: "Proyector",
      brand: "Epson",
      model: "XGA",
      serial: "11223EFG",
      issue: "Imagen borrosa",
      photo: "https://via.placeholder.com/50", // URL de la imagen
    },
  ]);

  // Filtrar los equipos según el texto de búsqueda
  const filteredEquipment = equipmentList.filter((equipment) =>
    Object.values(equipment)
      .join(" ")
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Informe</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonSearchbar
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value!)}
          placeholder="Buscar equipo..."
          className="custom-input-search"
        />
        <IonGrid>
          {/* Encabezados en pantallas grandes */}
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
              <strong>Falla</strong>
            </IonCol>
            <IonCol size="2">
              <strong>Foto</strong>
            </IonCol>
          </IonRow>

          {/* Filas dinámicas */}
          {filteredEquipment.map((equipment) => (
            <IonItem key={equipment.id} className="custom-item border-item">
              <IonRow>
                {/* En dispositivos pequeños, apilamos columnas */}
                <IonCol size="12" size-sm="2">
                  <strong className="ion-hide-sm-up">Nombre:</strong>{" "}
                  {equipment.name}
                </IonCol>
                <IonCol size="12" size-sm="2">
                  <strong className="ion-hide-sm-up">Marca:</strong>{" "}
                  {equipment.brand}
                </IonCol>
                <IonCol size="12" size-sm="2">
                  <strong className="ion-hide-sm-up">Modelo:</strong>{" "}
                  {equipment.model}
                </IonCol>
                <IonCol size="12" size-sm="2">
                  <strong className="ion-hide-sm-up">Serial:</strong>{" "}
                  {equipment.serial}
                </IonCol>
                <IonCol size="12" size-sm="2">
                  <strong className="ion-hide-sm-up">Falla:</strong>{" "}
                  {equipment.issue}
                </IonCol>
                <IonCol size="12" size-sm="2">
                  {equipment.photo ? (
                    <img
                      src={equipment.photo}
                      alt={`Foto de ${equipment.name}`}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  ) : (
                    <IonLabel>No disponible</IonLabel>
                  )}
                </IonCol>
              </IonRow>
            </IonItem>
          ))}

          {/* Mensaje de vacío */}
          {filteredEquipment.length === 0 && (
            <IonRow>
              <IonCol size="12" className="ion-text-center">
                <IonLabel>No se encontraron resultados.</IonLabel>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Report;
