import React, { useState, useEffect } from "react";
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
  IonSpinner,
  IonButtons,
  IonMenuButton,
  IonItem,
} from "@ionic/react";
import { getEquipment } from "../../services/equipmentService";
import "./Report.css";

interface Equipment {
  _id: string;
  name: string;
  brand: string;
  model: string;
  serial: string;
  issue: string;
  photos?: string | string[]; // Puede ser un string o un array de URLs
  technicalDataSheet?: string;
  diagnosis?: string;
  invoice?: string; // Factura
  assignedTechnician?: string; // Técnico asignado
}

const Report: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const data = await getEquipment();
        setEquipmentList(data);
      } catch (err) {
        setError("No se pudo cargar la lista de equipos. Inténtalo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

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
        {loading ? (
          <IonSpinner name="crescent" className="ion-text-center" />
        ) : error ? (
          <p className="ion-text-center">{error}</p>
        ) : (
          <IonGrid>
            {/* Encabezados en pantallas grandes */}
            <IonRow className="ion-hide-sm-down">
              {[
                "Nombre",
                "Marca",
                "Modelo",
                "Serial",
                "Falla",
                "Foto",
                "Ficha Técnica",
                "Diagnóstico",
                "Factura",
                "Técnico Asignado",
              ].map((header) => (
                <IonCol key={header} size="2">
                  <strong>{header}</strong>
                </IonCol>
              ))}
            </IonRow>

            {/* Filas dinámicas */}
            {filteredEquipment.map((equipment) => (
              <IonItem key={equipment._id} className="custom-item border-item">
                <IonRow>
                  {[
                    { label: "Nombre", value: equipment.name },
                    { label: "Marca", value: equipment.brand },
                    { label: "Modelo", value: equipment.model },
                    { label: "Serial", value: equipment.serial },
                    { label: "Falla", value: equipment.issue },
                    { label: "Foto", value: equipment.photos },
                    {
                      label: "Ficha Técnica",
                      value: equipment.technicalDataSheet || "No disponible",
                    },
                    {
                      label: "Diagnóstico",
                      value: equipment.diagnosis || "No disponible",
                    },
                    {
                      label: "Factura",
                      value: equipment.invoice ? (
                        <a
                          href={equipment.invoice}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver factura
                        </a>
                      ) : (
                        "No disponible"
                      ),
                    },
                    {
                      label: "Técnico Asignado",
                      value: equipment.assignedTechnician || "No asignado",
                    },
                  ].map((field, index) => (
                    <IonCol key={index} size="12" size-sm="2">
                      {field.label === "Foto" ? (
                        Array.isArray(field.value) && field.value.length > 0 ? (
                          <>
                            {field.label}:
                            <div>
                              {field.value &&
                                field.value.map((photoUrl, index) => (
                                  <>
                                    <img
                                      key={index}
                                      src={`data:image/png;base64,${photoUrl}`}
                                      alt={`Foto de ${equipment.name} ${
                                        index + 1
                                      }`}
                                      style={{
                                        width: "50px",
                                        height: "50px",
                                        objectFit: "cover",
                                        borderRadius: "4px",
                                        margin: "5px",
                                      }}
                                    />
                                  </>
                                ))}
                            </div>
                          </>
                        ) : (
                          <>
                            {field.label}: <IonLabel>No disponible</IonLabel>
                          </>
                        )
                      ) : (
                        <>
                          <strong className="ion-hide-sm-up">
                            {field.label}:
                          </strong>{" "}
                          {field.value}
                        </>
                      )}
                    </IonCol>
                  ))}
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
        )}
      </IonContent>
    </IonPage>
  );
};

export default Report;
