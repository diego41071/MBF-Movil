import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Preagends: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Preagendados</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
};

export default Preagends;
