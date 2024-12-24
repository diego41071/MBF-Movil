import { useRef, useState } from "react";
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
  const [photo, setPhoto] = useState<File | null>(null);
  const [assignedTechnician, setAssignedTechnician] = useState<string>("");
  const [invoice, setInvoice] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null); // Para la vista previa

  const [presentToast] = useIonToast();

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhoto(file);
      // Crear la URL temporal para la vista previa
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  };

  const handleInvoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // Validar tamaño del archivo (5 MB)
        alert("El archivo es demasiado grande. El límite es de 5 MB.");
        return;
      }
      setInvoice(file);
    }
  };

  const handleSubmit = async () => {
    try {
      // Crear el objeto FormData
      const formData = new FormData();
      formData.append("name", name);
      formData.append("brand", brand);
      formData.append("model", model);
      formData.append("serial", serial);
      formData.append("issue", issue);

      if (photo) {
        formData.append("photo", photo);
      }
      if (props.role === "Administrador" && invoice) {
        formData.append("invoice", invoice);
        formData.append("assignedTechnician", assignedTechnician);
      }

      console.log("Datos a enviar:", formData);

      // Enviar la solicitud
      await submitTechnicalServiceRequest(formData);

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
      setPhotoPreview(null); // Limpiar vista previa
      setInvoice(null);
      setAssignedTechnician("");
      // Revocar la URL de la vista previa
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
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
        {/* Mostrar la vista previa de la foto */}
        {photoPreview && (
          <IonImg src={photoPreview} alt="Vista previa de la foto" />
        )}
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
