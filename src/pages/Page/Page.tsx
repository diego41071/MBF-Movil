import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import ExploreContainer from "../../components/ExplorerContainer/ExploreContainer";
import "./Page.css";
import { useEffect } from "react";
import { App } from "@capacitor/app";

export default function Page(props: { role: any }) {
  const { name } = useParams<{ name: string }>();
  const history = useHistory();

  useEffect(() => {
    const backButtonListener = App.addListener("backButton", () => {
      // Previene volver al login si estás en la página de inicio
      if (history.location.pathname === "/page") {
        // Puedes mostrar un mensaje de confirmación si deseas
        App.exitApp(); // Cierra la app
      }
    });

    return () => {
      backButtonListener.remove(); // Limpia el listener cuando el componente se desmonta
    };
  }, [history]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="custom-title">Opciones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ExploreContainer role={props.role} />
      </IonContent>
    </IonPage>
  );
}
