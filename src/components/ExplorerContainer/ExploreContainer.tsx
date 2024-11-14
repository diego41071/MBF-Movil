import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonImg,
  IonTitle,
} from "@ionic/react";
import "./ExploreContainer.css";
import {
  build,
  buildOutline,
  calendar,
  calendarOutline,
  clipboard,
  clipboardOutline,
  qrCodeOutline,
  reader,
  readerOutline,
} from "ionicons/icons";

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <IonContent className="ion-padding">
      <div className="profile-grid">
        {[
          { name: "Cronograma", icon: calendarOutline },
          { name: "Fichas técnicas", icon: readerOutline },
          { name: "Solicitar servicio técnico", icon: buildOutline },
          { name: "Informe", icon: clipboardOutline },
          { name: "Escaneo de QR", icon: qrCodeOutline },
        ].map((item) => {
          return (
            <div className="profile-container">
              <div className="image-container">
                <div className="custom-image">
                  <IonIcon className="custom-icon-explore" icon={item.icon} />
                </div>
              </div>
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </IonContent>
  );
};

export default ExploreContainer;
