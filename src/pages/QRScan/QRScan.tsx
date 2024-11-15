import { IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

const QRScan: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Escaneo de QR</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
};

export default QRScan;
