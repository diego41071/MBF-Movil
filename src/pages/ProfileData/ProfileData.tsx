import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonAvatar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { useState } from "react";
import "./ProfileData.css";

const ProfileData: React.FC = () => {
  const [profileData, setProfileData] = useState({
    avatar: "https://via.placeholder.com/150", // Imagen por defecto
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    phone: "123-456-7890",
    address: "Calle Falsa 123, Ciudad, País",
  });

  const handleInputChange = (key: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log("Datos guardados:", profileData);
    // Aquí puedes realizar una llamada al backend para actualizar los datos
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Datos de perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="auto">
              <IonAvatar className="profile-avatar">
                <img src={profileData.avatar} alt="Avatar" />
              </IonAvatar>
            </IonCol>
          </IonRow>
        </IonGrid>
        <form>
          <IonItem className="custom-item">
            <IonLabel position="floating">Nombre</IonLabel>
            <IonInput
              value={profileData.name}
              onIonChange={(e) =>
                handleInputChange("name", e.detail.value || "")
              }
            />
          </IonItem>
          <IonItem className="custom-item">
            <IonLabel position="floating">Correo</IonLabel>
            <IonInput
              value={profileData.email}
              type="email"
              onIonChange={(e) =>
                handleInputChange("email", e.detail.value || "")
              }
            />
          </IonItem>
          <IonItem className="custom-item">
            <IonLabel position="floating">Teléfono</IonLabel>
            <IonInput
              value={profileData.phone}
              type="tel"
              onIonChange={(e) =>
                handleInputChange("phone", e.detail.value || "")
              }
            />
          </IonItem>
          <IonItem className="custom-item">
            <IonLabel position="floating">Dirección</IonLabel>
            <IonInput
              value={profileData.address}
              onIonChange={(e) =>
                handleInputChange("address", e.detail.value || "")
              }
            />
          </IonItem>
          <div className="container-button">
            <IonButton
              expand="block"
              onClick={handleSave}
              className="custom-button"
              color={"danger"}
            >
              Guardar Cambios
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default ProfileData;
