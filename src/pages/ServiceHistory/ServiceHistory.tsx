import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const ServiceHistory: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Historial de servicios</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
};

export default ServiceHistory;
