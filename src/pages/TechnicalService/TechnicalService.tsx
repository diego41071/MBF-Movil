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
} from "@ionic/react";
import { useState } from "react";
import "./TechnicalService.css";

const TechnicalService: React.FC = () => {
  const [nombreEquipo, setNombreEquipo] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [serial, setSerial] = useState("");
  const [falla, setFalla] = useState("");
  const [foto, setFoto] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

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
          <IonTitle>Soporte técnico</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {[
          {
            name: "Nombre del equipo",
            value: nombreEquipo,
            setvalue: setNombreEquipo,
          },
          { name: "Marca", value: marca, setvalue: setMarca },
          { name: "Modelo", value: modelo, setvalue: setModelo },
          { name: "Serial", value: serial, setvalue: setSerial },
          {
            name: "Falla de funcionamiento",
            value: falla,
            setvalue: setFalla,
          },
        ].map((item) => {
          return (
            <IonItem>
              <IonLabel position="floating">{item.name}</IonLabel>
              <IonInput
                value={item.value}
                onIonChange={(e) => item.setvalue(e.detail.value!)}
                className="custom-input"
                placeholder={item.name}
              />
            </IonItem>
          );
        })}

        <IonItem>
          <div className="file-input-container">
            <input type="file" accept="image/*" onChange={handleFotoChange} />
            Adjuntar foto
            <span className="file-name">
              {selectedFileName || "No se seleccionó ningún archivo"}
            </span>
          </div>
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
