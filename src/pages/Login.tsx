// src/components/Login.tsx
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonImg,
} from "@ionic/react";

export default function Login(props: { setIsLogged: (arg0: boolean) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const history = useHistory();

  const handleLogin = () => {
    // Aquí puedes manejar la lógica de inicio de sesión
    if (!email && !password) {
      setToastMessage("Por favor, complete todos los campos.");
      setShowToast(true);
    } else {
      // Simular un inicio de sesión exitoso
      setToastMessage("Inicio de sesión exitoso!");
      history.push("/folder/Page");
      props.setIsLogged(true);
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent className="ion-padding">
        <IonImg
          src="https://www.grupombf.com.co/wp-content/uploads/2024/07/7-300x300.png"
          alt="Logo"
        />
        <IonItem>
          <IonLabel position="floating">Correo Electrónico</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>
        <IonButton expand="full" onClick={handleLogin}>
          Iniciar Sesión
        </IonButton>
        <Link to="/folder/Register">Olvidaste la contraseña</Link>
        <br></br>

        <Link to="/folder/Register">Regístrate aquí</Link>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
}
