// src/components/Register.tsx
import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonRadioGroup,
  IonRadio,
  IonImg,
  IonRouterLink,
  IonIcon,
} from "@ionic/react";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import { logoGoogle, logoFacebook } from "ionicons/icons";
import validateEmail from "../../utils/validateEmail";

export default function Register(props: {
  setIsLogged: (arg0: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const [position, setPosition] = useState("");
  const [doc, setDoc] = useState("");
  const [company, setCompany] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [check, setCheck] = useState(0);

  const history = useHistory();

  const handleRegister = () => {
    // Aquí puedes manejar la lógica de registro
    if (
      !name ||
      !email ||
      !password ||
      !lastname ||
      !position ||
      !doc ||
      !company ||
      !confirmpass ||
      check === 0
    ) {
      setToastMessage("Por favor, complete todos los campos.");
      setShowToast(true);
    } else if (!validateEmail(email)) {
      setToastMessage("Por favor, introduce un correo electrónico válido.");
      setShowToast(true);
    } else if (password !== confirmpass) {
      setToastMessage("Las contraseñas deben ser iguales");
      setShowToast(true);
    } else {
      // Simular un registro exitoso
      setToastMessage("Registro exitoso!");
      history.push("/folder/Page");
      props.setIsLogged(true);
      setShowToast(true);
      // Aquí podrías añadir la lógica para enviar los datos a tu backend
    }
  };

  function handleGoogleLogin(): void {
    throw new Error("Function not implemented.");
  }

  function handleFacebookLogin(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Registrarse</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent className="ion-padding">
        <IonImg
          src="https://www.grupombf.com.co/wp-content/uploads/2023/08/MBF-BLANCO.png"
          alt="Logo"
          className="custom-img"
        />
        {[
          { text: "Nombre", value: name, set: setName },
          { text: "Apellido", value: lastname, set: setLastname },
          { text: "Nombre empresa", value: company, set: setCompany },
          { text: "Nit o C.C.", value: doc, set: setDoc },
          { text: "Cargo", value: position, set: setPosition },
          { text: "Correo Electrónico", value: email, set: setEmail },
          { text: "Contraseña", value: password, set: setPassword },
          {
            text: "Confirmar contraseña",
            value: confirmpass,
            set: setConfirmpass,
          },
          {
            text: "Su empresa tiene contratado servicios técnicos pre-agendados?",
            value: check,
            set: setName,
          },
        ].map((item, index) => {
          return (
            <IonItem key={index}>
              <IonLabel
                position="floating"
                className={index === 8 ? "custom-label" : ""}
              >
                {item.text}
              </IonLabel>
              {index === 8 ? (
                <IonRadioGroup
                  value={check}
                  onIonChange={(e) => setCheck(e.detail.value)}
                >
                  <IonItem>
                    <IonRadio className="custom-radio" slot="start" value={1} />
                    <IonLabel>Sí</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonRadio className="custom-radio" slot="start" value={2} />
                    <IonLabel>No</IonLabel>
                  </IonItem>
                </IonRadioGroup>
              ) : (
                <IonInput
                  value={item.value}
                  onIonInput={(e) => item.set(e.detail.value!)}
                  className="custom-input"
                  placeholder={item.text}
                />
              )}
            </IonItem>
          );
        })}
        <div className="container-button">
          <IonButton
            color={"danger"}
            className="custom-button-register"
            onClick={handleRegister}
          >
            Registrarse
          </IonButton>
        </div>
        <IonItem>
          <IonLabel className="custom-label-login">Ó regístrate con</IonLabel>
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
          <IonLabel className="sign-center">
            Si ya tienes una cuenta,{" "}
            <Link to="/folder/Login"> inicia sesión</Link>
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
