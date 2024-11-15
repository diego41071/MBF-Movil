import { IonContent, IonIcon } from "@ionic/react";
import "./ExploreContainer.css";
import {
  bluetoothOutline,
  buildOutline,
  calendarOutline,
  clipboardOutline,
  qrCodeOutline,
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
          {
            name: "Báscula por bluetooth",
            icon: bluetoothOutline,
            route: "/bluetooth",
          },
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
