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
import { useHistory } from "react-router-dom";

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const redirectPages = (route: string) => {
    history.push(route);
  };
  return (
    <IonContent className="ion-padding">
      <div className="profile-grid">
        {[
          { name: "Cronograma", icon: calendarOutline, route: "/schedule" },
          {
            name: "Fichas técnicas",
            icon: readerOutline,
            route: "/technicaldatasheet",
          },
          {
            name: "Solicitar servicio técnico",
            icon: buildOutline,
            route: "/technicalservice",
          },
          { name: "Informe", icon: clipboardOutline, route: "/report" },
          { name: "Escaneo de QR", icon: qrCodeOutline, route: "/qrscan" },
        ].map((item) => {
          return (
            <div
              className="profile-container"
              onClick={(e) => redirectPages(item.route)}
            >
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
