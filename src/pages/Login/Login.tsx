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
import "./Login.css";

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
          src="https://www.grupombf.com.co/wp-content/uploads/2023/08/MBF-BLANCO.png"
          alt="Logo"
        />
        <IonItem>
          <IonLabel className="custom-label-login" position="floating">
            Correo Electrónico
          </IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            className="custom-input"
            placeholder="Correo Electrónico"
          />
        </IonItem>
        <IonItem>
          <IonLabel className="custom-label-login" position="floating">
            Contraseña
          </IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            className="custom-input"
            placeholder="Contraseña"
          />
        </IonItem>
        <div className="container-button">
          <IonButton
            color={"danger"}
            className="custom-button"
            onClick={handleLogin}
          >
            Iniciar Sesión
          </IonButton>
        </div>
        <div className="centered-link">
          <Link to="/folder/Register">Olvidaste la contraseña</Link>
        </div>
        <div className="centered-link">
          <IonLabel>
            Si no tienes una cuenta{" "}
            <Link className="custom-link" to="/folder/Register">
              regístrate aquí
            </Link>
          </IonLabel>
        </div>
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
