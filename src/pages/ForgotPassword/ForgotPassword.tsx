import { useState } from "react";
import { IonButton, IonInput, IonItem, IonLabel, IonPage } from "@ionic/react";
import axios from "axios";
import { handleForgotPassword } from "../../services/authService";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");

  return (
    <IonPage>
      <IonItem className="custom-item">
        <IonLabel className="custom-label-login">Correo electrónico</IonLabel>
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
          className="custom-button"
        >
          Recuperar Contraseña
        </IonButton>
      </div>
    </IonPage>
  );
};

export default ForgotPassword;
