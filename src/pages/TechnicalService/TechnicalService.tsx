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
  IonImg,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";
import { useState } from "react";
import { submitTechnicalServiceRequest } from "../../services/equipmentService"; // Importamos el servicio
import "./TechnicalService.css";

const TechnicalService: React.FC = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serial, setSerial] = useState("");
  const [issue, setIssue] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

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
      setSelectedFileName(file.name); // Guarda el nombre del archivo seleccionado
    }
  };

  const handleSubmit = async () => {
    const requestData = {
      name,
      brand,
      model,
      serial,
      issue,
      photo,
    };

    try {
      const response = await submitTechnicalServiceRequest(requestData); // Llamamos al servicio
      alert("Request sent successfully!");
      console.log("Response from server:", response);

      // Resetear campos del formulario
      setName("");
      setBrand("");
      setModel("");
      setSerial("");
      setIssue("");
      setPhoto(null);
      setSelectedFileName(null);
    } catch (error) {
      alert("An error occurred while sending the request. Please try again.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Technical Support</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {[
          {
            label: "Equipment Name",
            value: name,
            setter: setName,
          },
          { label: "Brand", value: brand, setter: setBrand },
          { label: "Model", value: model, setter: setModel },
          {
            label: "Serial Number",
            value: serial,
            setter: setSerial,
          },
          { label: "Issue Description", value: issue, setter: setIssue },
        ].map((field, index) => (
          <IonItem key={index} className="custom-item">
            <IonLabel position="floating">{field.label}</IonLabel>
            <IonInput
              value={field.value}
              onIonChange={(e) => field.setter(e.detail.value!)}
              className="custom-input"
              placeholder={field.label}
            />
          </IonItem>
        ))}

        <IonItem className="custom-item">
          <div className="file-input-container">
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
            Attach Photo
            <span className="file-name">
              {selectedFileName || "No file selected"}
            </span>
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
            Submit Request
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TechnicalService;
