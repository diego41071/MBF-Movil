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
  IonIcon,
} from "@ionic/react";
import "./Login.css";
import { home, personCircle, logoGoogle, logoFacebook } from "ionicons/icons";

export default function Login(props: { setIsLogged: (arg0: boolean) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const history = useHistory();

  const handleLogin = () => {
    // Aquí puedes manejar la lógica de inicio de sesión
    if (!email || !password) {
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

  function handleGoogleLogin() {
    throw new Error("Function not implemented.");
  }

  function handleFacebookLogin() {
    throw new Error("Function not implemented.");
  }

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
          <IonLabel position="floating">Correo Electrónico</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            className="custom-input"
            placeholder="Correo Electrónico"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            className="custom-input"
            placeholder="Contraseña"
          />
        </IonItem>
        <div className="centered-link">
          <Link to="/folder/Register">¿Olvidaste tu contraseña?</Link>
        </div>
        <div className="container-button">
          <IonButton
            color={"danger"}
            className="custom-button"
            onClick={handleLogin}
          >
            Iniciar Sesión
          </IonButton>
        </div>
        <IonLabel className="custom-label-login">Ó inicia sesión con</IonLabel>
        <div className="flex-icons">
          <div>
            <IonIcon
              className="custom-icon"
              onClick={handleGoogleLogin}
              icon={logoGoogle}
              slot="start"
            />
          </div>
          <div>
            <IonIcon
              className="custom-icon"
              onClick={handleFacebookLogin}
              icon={logoFacebook}
              slot="start"
            />
          </div>
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
