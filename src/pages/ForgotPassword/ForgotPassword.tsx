import { useState } from "react";
import { IonButton, IonInput, IonPage } from "@ionic/react";
import axios from "axios";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    try {
      await axios.post("http://localhost:3000/auth/forgot-password", { email });
      alert("Correo enviado para recuperación de contraseña");
    } catch (error) {
      alert("Error al solicitar recuperación de contraseña");
    }
  };

  return (
    <IonPage>
      <IonInput
        placeholder="Ingrese su correo"
        value={email}
        onIonChange={(e) => setEmail(e.detail.value!)}
      />
      <IonButton onClick={handleForgotPassword}>Recuperar Contraseña</IonButton>
    </IonPage>
  );
};

export default ForgotPassword;
