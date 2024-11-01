import { useState } from "react";
import { IonButton, IonInput, IonPage } from "@ionic/react";
import axios from "axios";

const ResetPassword: React.FC = () => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async () => {
    try {
      await axios.post("http://localhost:3000/auth/reset-password", {
        token,
        newPassword,
      });
      alert("Contraseña actualizada correctamente");
    } catch (error) {
      alert("Error al restablecer la contraseña");
    }
  };

  return (
    <IonPage>
      <IonInput
        placeholder="Ingrese el token"
        value={token}
        onIonChange={(e) => setToken(e.detail.value!)}
      />
      <IonInput
        placeholder="Ingrese su nueva contraseña"
        type="password"
        value={newPassword}
        onIonChange={(e) => setNewPassword(e.detail.value!)}
      />
      <IonButton onClick={handleResetPassword}>Actualizar Contraseña</IonButton>
    </IonPage>
  );
};

export default ResetPassword;
