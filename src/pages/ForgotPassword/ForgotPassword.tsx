import { useState } from "react";
import {
  IonButton,
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
      <IonItem className="custom-itemforgot">
        <IonLabel position="floating">Correo electrónico</IonLabel>
        <IonInput
          placeholder="Ingrese su correo"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value!)}
          className="custom-input"
        />

        <div className="container-button button-forgot">
          <IonButton
            onClick={(e) => handleForgotPassword(email)}
            routerLink="/resetpassword"
            className="custom-button"
          >
            Recuperar Contraseña
          </IonButton>
        </div>
      </IonItem>
    </IonPage>
  );
};

export default ForgotPassword;
