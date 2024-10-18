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
} from "@ionic/react";
import "./Register.css";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
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
      !confirmpass
    ) {
      setToastMessage("Por favor, complete todos los campos.");
      setShowToast(true);
    } else {
      // Simular un registro exitoso
      setToastMessage("Registro exitoso!");
      setShowToast(true);
      // Aquí podrías añadir la lógica para enviar los datos a tu backend
    }
  };

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
        />
        {[
          { text: "Nombre", value: name, set: setName },
          { text: "Apellido", value: lastname, set: setLastname },
          { text: "Cargo", value: position, set: setPosition },
          { text: "Correo Electrónico", value: email, set: setEmail },
          { text: "Nit o C.C.", value: doc, set: setDoc },
          { text: "Nombre empresa", value: company, set: setCompany },
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
                // value={selectedValue}
                // onIonChange={handleRadioChange}
                >
                  <IonItem>
                    <IonRadio
                      className="custom-radio"
                      slot="start"
                      value="option1"
                    />
                    <IonLabel>Sí</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonRadio
                      className="custom-radio"
                      slot="start"
                      value="option2"
                    />
                    <IonLabel>No</IonLabel>
                  </IonItem>
                </IonRadioGroup>
              ) : (
                <IonInput
                  value={item.value}
                  onIonChange={(e) => item.set(e.detail.value!)}
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
};

export default Register;
