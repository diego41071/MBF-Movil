import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const ProfileData: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Datos de perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
};

export default ProfileData;
