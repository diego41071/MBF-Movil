import { useState } from "react";
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
} from "@ionic/react";
import axios from "axios";
import "./Resetpassword.css";

const ResetPassword: React.FC = () => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async () => {
    if (!newPassword) {
      alert("Complete el campo de contraseña");
    } else {
      try {
        await axios.post("http://localhost:3000/auth/reset-password", {
          token,
          newPassword,
        });
        alert("Contraseña actualizada correctamente");
      } catch (error) {
        alert("Error al restablecer la contraseña");
      }
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonItem className="custom-item">
          <IonLabel position="floating">Token</IonLabel>
          <IonInput
            placeholder="Ingrese el token"
            value={token}
            onIonChange={(e) => setToken(e.detail.value!)}
            className="custom-input"
          />
        </IonItem>
        <IonItem className="custom-item">
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            placeholder="Ingrese su nueva contraseña"
            type="password"
            value={newPassword}
            onIonChange={(e) => setNewPassword(e.detail.value!)}
            className="custom-input"
          />
        </IonItem>
        <IonButton
          className="custom-button margin-button"
          onClick={handleResetPassword}
        >
          Actualizar Contraseña
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ResetPassword;
