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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleRegister = () => {
    // Aquí puedes manejar la lógica de registro
    if (name && email && password) {
      // Simular un registro exitoso
      setToastMessage("Registro exitoso!");
      setShowToast(true);
      // Aquí podrías añadir la lógica para enviar los datos a tu backend
    } else {
      setToastMessage("Por favor, complete todos los campos.");
      setShowToast(true);
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
          { text: "Nombre", value: name },
          { text: "Apellido", value: name },
          { text: "Cargo", value: name },
          { text: "Correo Electrónico", value: email },
          { text: "Nit o C.C.", value: name },
          { text: "Nombre empresa", value: name },
          { text: "Contraseña", value: password },
          { text: "Confirmar contraseña", value: password },
          {
            text: "Su empresa tiene contratado servicios técnicos pre-agendados?",
            value: password,
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
                    <IonRadio slot="start" value="option1" />
                    <IonLabel>Sí</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonRadio slot="start" value="option2" />
                    <IonLabel>No</IonLabel>
                  </IonItem>
                </IonRadioGroup>
              ) : (
                <IonInput
                  value={item.value}
                  onIonChange={(e) => setName(e.detail.value!)}
                />
              )}
            </IonItem>
          );
        })}
        <IonButton expand="full" onClick={handleRegister}>
          Registrarse
        </IonButton>
        <IonLabel>
          Si ya tienes una cuenta,{" "}
          <Link to="/folder/Login"> inicia sesión</Link>
        </IonLabel>
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
