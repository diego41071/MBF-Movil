import { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import { handleForgotPassword } from "../../services/authService";
import "./Forgotpassword.css";

export default function ForgotPassword(props: {
  email: string;
  setEmail: (arg0: string) => void;
}) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recuperación de contraseña</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem className="custom-item">
          <IonLabel position="floating">Correo electrónico</IonLabel>
          <IonInput
            placeholder="Ingrese su correo"
            value={props.email}
            onIonInput={(e) => props.setEmail(e.detail.value!)}
            className="custom-input"
          />
        </IonItem>
        <div className="container-button">
          <IonButton
            onClick={(e) => handleForgotPassword(props.email)}
            routerLink="/resetpassword"
            className="custom-button margin-button"
            color={"danger"}
          >
            Enviar Código
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}
