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
import "./Resetpassword.css";
import { handleResetPassword } from "../../services/authService";

export default function ResetPassword(props: { email: string }) {
  const [code, setCode] = useState(0);
  const [newPassword, setNewPassword] = useState("");
  const [ConfirmnewPassword, setConfirmNewPassword] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cambiar contraseña</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem className="custom-item">
          <IonLabel position="floating">Código</IonLabel>
          <IonInput
            placeholder="Ingrese el código"
            value={code === 0 ? "" : code}
            onIonInput={(e) => setCode(Number(e.detail.value!))}
            className="custom-input"
            type="number"
          />
        </IonItem>
        <IonItem className="custom-item">
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            placeholder="Ingrese su nueva contraseña"
            type="password"
            value={newPassword}
            onIonInput={(e) => setNewPassword(e.detail.value!)}
            className="custom-input"
          />
        </IonItem>
        <IonItem className="custom-item">
          <IonLabel position="floating">Confirmar contraseña</IonLabel>
          <IonInput
            placeholder="Confirme su nueva contraseña"
            type="password"
            value={ConfirmnewPassword}
            onIonInput={(e) => setConfirmNewPassword(e.detail.value!)}
            className="custom-input"
          />
        </IonItem>
        <div className="container-button">
          <IonButton
            className="custom-button margin-button"
            onClick={(e) =>
              handleResetPassword(
                props.email,
                code,
                newPassword,
                ConfirmnewPassword
              )
            }
            color={"danger"}
          >
            Actualizar Contraseña
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}
