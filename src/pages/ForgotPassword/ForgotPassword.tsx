import { useState } from "react";
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
} from "@ionic/react";
import axios from "axios";
import { handleForgotPassword } from "../../services/authService";
import "./Forgotpassword.css";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recuperación de contraseña</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem className="custom-item">
          <IonLabel position="floating">Correo electrónico</IonLabel>
          <IonInput
            placeholder="Ingrese su correo"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            className="custom-input"
          />
        </IonItem>
        <div className="container-button">
          <IonButton
            onClick={(e) => handleForgotPassword(email)}
            routerLink="/resetpassword"
            className="custom-button margin-button"
            color={"danger"}
          >
            Recuperar Contraseña
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
