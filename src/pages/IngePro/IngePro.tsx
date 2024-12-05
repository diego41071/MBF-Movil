import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const IngePro: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonToolbar>
          <IonTitle>Inge Pro</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
};

export default IngePro;
