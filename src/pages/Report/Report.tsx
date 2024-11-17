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
} from "@ionic/react";

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
          <IonTitle>Informe</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Barra de búsqueda */}
        <IonSearchbar
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value!)}
          placeholder="Buscar equipo..."
        />

        {/* Tabla */}
        <IonGrid>
          <IonRow>
            <IonCol>
              <strong>Nombre</strong>
            </IonCol>
            <IonCol>
              <strong>Marca</strong>
            </IonCol>
            <IonCol>
              <strong>Modelo</strong>
            </IonCol>
            <IonCol>
              <strong>Serial</strong>
            </IonCol>
            <IonCol>
              <strong>Falla</strong>
            </IonCol>
            <IonCol>
              <strong>Foto</strong>
            </IonCol>
          </IonRow>
          {filteredEquipment.map((equipment) => (
            <IonRow key={equipment.id}>
              <IonCol>{equipment.name}</IonCol>
              <IonCol>{equipment.brand}</IonCol>
              <IonCol>{equipment.model}</IonCol>
              <IonCol>{equipment.serial}</IonCol>
              <IonCol>{equipment.issue}</IonCol>
              <IonCol>
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
          ))}
          {filteredEquipment.length === 0 && (
            <IonRow>
              <IonCol colSpan={6} className="ion-text-center">
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
