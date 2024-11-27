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
import ExploreContainer from "../../components/ExplorerContainer/ExploreContainer";
import "./Page.css";

export default function Page(props: { role: any }) {
  const { name } = useParams<{ name: string }>();

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
