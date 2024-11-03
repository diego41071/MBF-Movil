import { useState } from "react";
import { IonButton, IonInput, IonPage } from "@ionic/react";
import axios from "axios";
import { handleForgotPassword } from "../../services/authService";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");

  return (
    <IonPage>
      <IonInput
        placeholder="Ingrese su correo"
        value={email}
        onIonChange={(e) => setEmail(e.detail.value!)}
      />
      <IonButton
        onClick={(e) => handleForgotPassword(email)}
        routerLink="/resetpassword"
      >
        Recuperar Contraseña
      </IonButton>
    </IonPage>
  );
};

export default ForgotPassword;
