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
  IonButton,
  IonModal,
  IonText,
} from "@ionic/react";
import { getEquipment } from "../../services/equipmentService";
import "./Report.css";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { FileOpener } from "@ionic-native/file-opener";

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  const handleViewPdf = async (id: string, fileName: string): Promise<void> => {
    try {
      // Obtener el PDF en formato Base64 desde el backend
      // const base64 = await fetchPDF(id);

      // Guardar el archivo en el dispositivo
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: "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QO1EdBxs/yj992R03BlX4C13/Dlv4ofepIsxyZd9KV/70274UQ6ccNb98BhUENmH4AaybsRlfBqTfDTaDyXsqjZki+Wg33D+nJeVU5VDSIAWMpkIZwhq4Le9tabZlogdEb53PYlwjLQ7zUashPXh80t8FtC/FZf5U1zmj/kffAeUvwSybtPn4OS79Ode2PSpoNmicMohexIQNVATsDKYbYJIghgBcMHGw5r9+UoeFQI0EhkAHcUXIozCD/fXmmeZIzY7vSdcAdjmldg0OMzbdLp6P9/WCn7CxLEgoPfp/mS4i+/86V/4UqFUh6L8CNmTTU5oGhxLhlgGcgg/I2FRxO9FHSd6kgJSipZEe6JVo3gU1gi1vbSmiSbHYlsUSOzhKP+b7vj3KW+cAtDhxr8nJkzZL225CeRTNf8LdfBXOqT+HMhELEbmezU27ZIv5WMvFfHh5HdH+tba3XMtkSDb8MbIp2CzoHb5yDJeBdzKENJHAbKKVNrC5XkEohSxtK5MlaPS9dOaxxntQGSN3Q1feiSKCsTveBIQqRGvL/qSP/OlkM9F6pMMCgcn8J4n8Q1XPAL3ngjfBodnkTVqisk5VG/NVRugReDtgDWSLzBwuHIW+5H3zbySyhcGPekCDAeIK1gc5CnImgF6okiSLVE0kKtbK7Sd1YbXNCb49kF6C4AD/R5O/x2ss/TXmeEHYJ5tlVpkYTWkCmiLTyhGemXh8pF9w1R59PgIs8qrzPZpCt2hQQ0GcegFREhYxCwWLE7NppJigAXc4V0Ryl18oZv+4AsiKWzTQRJqJNFsjoLNBqZC+jUrCApsurP6FbjPpjAexR148RgUcIU+0AcutUXhKzRfySt5Ja/klTx9+f+2MzItCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDE2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMjI5MCAwMDAwMCBuIAowMDAwMDAyMzQ3IDAwMDAwIG4gCjAwMDAwMDIyMjggMDAwMDAgbiAKMDAwMDAwMjIwNyAwMDAwMCBuIAowMDAwMDAwMjYyIDAwMDAwIG4gCjAwMDAwMDAxMTkgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAzNTYwIDAwMDAwIG4gCjAwMDAwMDIxMDUgMDAwMDAgbiAKMDAwMDAwMjAwNyAwMDAwMCBuIAowMDAwMDAxOTMxIDAwMDAwIG4gCjAwMDAwMDE4NDUgMDAwMDAgbiAKMDAwMDAwMTg3MCAwMDAwMCBuIAowMDAwMDAxODk1IDAwMDAwIG4gCjAwMDAwMDIzOTQgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSAxNgovUm9vdCAzIDAgUgovSW5mbyAxMSAwIFIKL0lEIFs8MzQ2NzU1MzJjZjM3YWFiZDBlZTg0MzNlNzFkNmU3ZDI+IDwzNDY3NTUzMmNmMzdhYWJkMGVlODQzM2U3MWQ2ZTdkMj5dCj4+CnN0YXJ0eHJlZgoyMzE3NQolJUVPRgo=",
        directory: Directory.External,
      });

      console.log("Archivo guardado en:", savedFile.uri);
      alert("Archivo guardado correctamente");

      // Abrir el archivo guardado
      await openFile(savedFile.uri);
    } catch (error) {
      console.error("Error al descargar o guardar el archivo:", error);
      alert("No se pudo guardar el archivo");
    }
  };

  const generateBlobUrl = async (
    base64: string,
    fileName: string
  ): Promise<void> => {
    try {
      // Guardar el archivo en el dispositivo
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64,
        directory: Directory.External,
      });

      console.log("Archivo guardado en:", savedFile.uri);
      alert("Archivo guardado correctamente");

      // Abrir el archivo guardado
      await openFile(savedFile.uri);
    } catch (error) {
      console.error("Error al descargar o guardar el archivo:", error);
      alert("No se pudo guardar el archivo");
    }
  };

  const openFile = async (filePath: string) => {
    try {
      await FileOpener.open(filePath, "application/pdf");
      console.log("Archivo abierto correctamente");
    } catch (error) {
      console.error("Error al abrir el archivo:", error);
      alert("No se pudo abrir el archivo");
    }
  };

  // Filtrar los equipos según el texto de búsqueda
  const filteredEquipment = equipmentList.filter((equipment) =>
    Object.values(equipment)
      .join(" ")
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const handleImageClick = (photoUrl: string) => {
    setSelectedImage(photoUrl);
    setIsModalOpen(true);
  };

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
        {searchText.trim() && filteredEquipment.length > 0 && (
          <IonText className="records-count">
            {filteredEquipment.length} registro
            {filteredEquipment.length !== 1 ? "s" : ""} encontrado
            {filteredEquipment.length !== 1 ? "s" : ""}
          </IonText>
        )}
        {searchText.trim() && filteredEquipment.length === 0 && (
          <IonText className="records-count records-count-none">
            No se encontraron resultados para "{searchText.trim()}".
          </IonText>
        )}
        {loading ? (
          <IonSpinner name="crescent" className="ion-text-center" />
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
                        <IonButton
                          onClick={() =>
                            equipment.invoice &&
                            generateBlobUrl(
                              equipment.invoice,
                              `Factura_${equipment.name || "desconocido"}.pdf`
                            )
                          }
                        >
                          Descargar factura
                        </IonButton>
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
                              {field.value.map((photoUrl, index) => (
                                <img
                                  key={index}
                                  src={`data:image/png;base64,${photoUrl}`}
                                  alt={`Foto de ${equipment.name} ${index + 1}`}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    objectFit: "cover",
                                    borderRadius: "4px",
                                    margin: "5px",
                                  }}
                                  onClick={() => handleImageClick(photoUrl)}
                                />
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
                <IonButton
                  color="primary"
                  onClick={(e) =>
                    handleViewPdf(
                      equipment._id, // ID del inventario
                      `FichaTecnica_${equipment.name || "desconocido"}.pdf`
                    )
                  }
                >
                  Ver PDF
                </IonButton>
              </IonItem>
            ))}
          </IonGrid>
        )}
        <IonModal
          isOpen={isModalOpen}
          onDidDismiss={() => setIsModalOpen(false)}
        >
          <IonContent>
            <div className="flex-modal">
              <div>
                <div className="flex">
                  {selectedImage && (
                    <img
                      src={`data:image/png;base64,${selectedImage}`}
                      alt="Imagen ampliada"
                      className="img-modal"
                    />
                  )}
                </div>
                <div className="container-button">
                  <IonButton
                    onClick={() => setIsModalOpen(false)}
                    className="custom-button margin-button"
                    color={"danger"}
                  >
                    Cerrar
                  </IonButton>
                </div>
              </div>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Report;
