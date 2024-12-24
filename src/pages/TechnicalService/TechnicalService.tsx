import { useRef, useState, useEffect } from "react";
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
  IonButtons,
  IonMenuButton,
  IonImg,
  useIonToast,
} from "@ionic/react";
import { submitTechnicalServiceRequest } from "../../services/equipmentService";
import "./TechnicalService.css";
import pako from "pako";

interface TechnicalServiceProps {
  role: string;
}

interface TechnicalServiceRequest {
  name: string;
  brand: string;
  model: string;
  serial: string;
  issue: string;
  photo: string | null;
  invoice?: string | null;
  assignedTechnician?: string;
}

const TechnicalService: React.FC<TechnicalServiceProps> = (props) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serial, setSerial] = useState("");
  const [issue, setIssue] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [assignedTechnician, setAssignedTechnician] = useState<string>("");

  const [invoice, setInvoice] = useState<string | null>(null); // Usamos useState en lugar de useRef

  const [presentToast] = useIonToast();

  const handlePhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInvoiceChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // Validar tamaño del archivo (5 MB)
        alert("El archivo es demasiado grande. El límite es de 5 MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;

        // Comprimir con GZIP
        const compressedData = pako.gzip(base64String);

        // Convertir a Base64 nuevamente para envío
        const compressedBase64 = btoa(
          String.fromCharCode.apply(
            null,
            Array.from(new Uint8Array(compressedData))
          )
        );

        console.log("Archivo comprimido en Base64:", compressedBase64);

        // Aquí puedes almacenar el archivo comprimido para enviarlo al backend
        setInvoice(compressedBase64);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    console.log("Datos antes de enviar:", { invoice });

    const requestData: TechnicalServiceRequest = {
      name,
      brand,
      model,
      serial,
      issue,
      photo,
    };

    if (props.role === "Administrador") {
      requestData.invoice = invoice; // Usar la factura en Base64
      requestData.assignedTechnician = assignedTechnician;
    }

    console.log("Datos a enviar: ", requestData);

    try {
      await submitTechnicalServiceRequest(requestData);
      presentToast({
        message: "Solicitud enviada exitosamente.",
        duration: 2000,
        color: "success",
      });
      // Resetear campos del formulario
      setName("");
      setBrand("");
      setModel("");
      setSerial("");
      setIssue("");
      setPhoto(null);
      setInvoice(null);
      setAssignedTechnician("");
    } catch (error) {
      presentToast({
        message: "Error al enviar la solicitud.",
        duration: 2000,
        color: "danger",
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Servicio Técnico</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {[
          { label: "Nombre del equipo", value: name, setter: setName },
          { label: "Marca", value: brand, setter: setBrand },
          { label: "Modelo", value: model, setter: setModel },
          { label: "Serial", value: serial, setter: setSerial },
          { label: "Falla", value: issue, setter: setIssue },
          props.role === "Administrador" && {
            label: "Factura",
            value: null, // No necesitamos almacenar el valor directamente aquí
            setter: handleInvoiceChange,
          },
          props.role === "Administrador" && {
            label: "Asignar técnico",
            value: assignedTechnician,
            setter: setAssignedTechnician,
          },
        ].map(
          (field, index) =>
            field && (
              <IonItem key={index} className="custom-item">
                <IonLabel position="floating">{field.label}</IonLabel>
                {index === 5 ? (
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={field.setter} // Usamos el handler de invoice
                    className="custom-input"
                  />
                ) : (
                  <IonInput
                    value={field.value as string}
                    onIonChange={(e) => field.setter(e.detail.value!)}
                    className="custom-input"
                    placeholder={field.label}
                  />
                )}
              </IonItem>
            )
        )}

        <IonItem className="custom-item">
          <IonLabel position="floating">Agregar foto</IonLabel>
          <div className="file-input-container">
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </div>
        </IonItem>

        {photo && <IonImg src={photo} alt="Attached Photo" />}
        <div className="container-button">
          <IonButton
            expand="block"
            onClick={handleSubmit}
            className="custom-button"
            color={"danger"}
          >
            Enviar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TechnicalService;
