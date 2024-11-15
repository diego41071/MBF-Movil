import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  IonImg,
} from "@ionic/react";
import { useState } from "react";

const TechnicalService: React.FC = () => {
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [serial, setSerial] = useState("");
  const [falla, setFalla] = useState("");
  const [foto, setFoto] = useState<string | null>(null);

  const handleFotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // Procesa los datos del formulario
    console.log({
      nombreEquipo,
      marca,
      modelo,
      serial,
      falla,
      foto,
    });
    // Aquí puedes añadir la lógica para enviar la solicitud a un backend
    alert("Solicitud enviada");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Solicitud de Soporte</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Nombre del equipo</IonLabel>
          <IonInput
            value={nombreEquipo}
            onIonChange={(e) => setNombreEquipo(e.detail.value!)}
            className="custom-input"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Marca</IonLabel>
          <IonInput
            value={marca}
            onIonChange={(e) => setMarca(e.detail.value!)}
            className="custom-input"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Modelo</IonLabel>
          <IonInput
            value={modelo}
            onIonChange={(e) => setModelo(e.detail.value!)}
            className="custom-input"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Serial</IonLabel>
          <IonInput
            value={serial}
            onIonChange={(e) => setSerial(e.detail.value!)}
            className="custom-input"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Falla de funcionamiento</IonLabel>
          <IonTextarea
            value={falla}
            onIonChange={(e) => setFalla(e.detail.value!)}
            className="custom-input"
          />
        </IonItem>

        <IonItem>
          <IonLabel>Adjuntar foto</IonLabel>
          <input type="file" accept="image/*" onChange={handleFotoChange} />
        </IonItem>

        {foto && <IonImg src={foto} alt="Foto adjunta" />}
        <div className="container-button">
          <IonButton
            expand="block"
            onClick={handleSubmit}
            className="custom-button"
            color={"danger"}
          >
            Solicitar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TechnicalService;
