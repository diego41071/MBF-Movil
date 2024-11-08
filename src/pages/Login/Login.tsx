// src/components/login.tsx
import { useState } from "react";
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
import { logoGoogle, logoFacebook } from "ionicons/icons";
import validateEmail from "../../utils/validateEmail";
import { login } from "../../services/authService";

export default function Login(props: { setIsLogged: (arg0: boolean) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [token, setToken] = useState("");

  const history = useHistory();

  const saveToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken); // Opcional, para persistencia
  };

  const handleLogin = async () => {
    // Aquí puedes manejar la lógica de inicio de sesión
    if (!email || !password) {
      setToastMessage("Por favor, complete todos los campos.");
      setShowToast(true);
    } else if (!validateEmail(email)) {
      setToastMessage("Por favor, introduce un correo electrónico válido.");
      setShowToast(true);
    } else {
      // Simular un inicio de sesión exitoso

      try {
        const data = await login(email, password);
        console.log("Logged in!", data);
        saveToken(data.access_token);
        setToastMessage("Inicio de sesión exitoso!");
        props.setIsLogged(true);
        setShowToast(true);
        history.push("/page");
        // Aquí puedes guardar el token en localStorage o en el estado
      } catch (error) {
        setToastMessage("Usuario o contraseña incorrectos");
        setShowToast(true);
      }
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
        <IonImg src="/images/logo.png" alt="Logo" className="custom-img" />
        <IonItem className="custom-item">
          <IonLabel position="floating">Correo Electrónico</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonInput={(e) => setEmail(e.detail.value!)}
            className="custom-input"
            placeholder="Correo Electrónico"
          />
        </IonItem>
        <IonItem className="custom-item">
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonInput={(e) => setPassword(e.detail.value!)}
            className="custom-input"
            placeholder="Contraseña"
          />
        </IonItem>
        <div className="centered-link">
          <Link to="/forgotpassword">¿Olvidaste tu contraseña?</Link>
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
        <IonItem className="custom-item">
          <IonLabel className="custom-label-login">
            Ó inicia sesión con
          </IonLabel>
        </IonItem>
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
            <Link className="custom-link" to="/register">
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
