import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from "ionicons/icons";
import "./Menu.css";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  click: any;
}

const labels = [
  { title: "Términos y condiciones" },
  { title: "Política de privacidad" },
  { title: "Autorización de tratamiento de datos personales" },
];

export default function Menu(props: { setIsLogged: (arg0: boolean) => any }) {
  const location = useLocation();

  const appPages: AppPage[] = [
    {
      title: "Mi cuenta",
      url: "/folder/Login",
      iosIcon: mailOutline,
      mdIcon: mailSharp,
      click: "",
    },
    {
      title: "Datos de perifl",
      url: "/folder/Outbox",
      iosIcon: paperPlaneOutline,
      mdIcon: paperPlaneSharp,
      click: "",
    },
    {
      title: "Historial servicios",
      url: "/folder/Favorites",
      iosIcon: heartOutline,
      mdIcon: heartSharp,
      click: "",
    },
    {
      title: "Inge Basic",
      url: "/folder/Archived",
      iosIcon: archiveOutline,
      mdIcon: archiveSharp,
      click: "",
    },
    {
      title: "Inge Pro",
      url: "/folder/Trash",
      iosIcon: trashOutline,
      mdIcon: trashSharp,
      click: "",
    },
    {
      title: "Idioma",
      url: "/folder/Spam",
      iosIcon: warningOutline,
      mdIcon: warningSharp,
      click: "",
    },
    {
      title: "Notificaciones",
      url: "/folder/Spam",
      iosIcon: warningOutline,
      mdIcon: warningSharp,
      click: "",
    },
    {
      title: "Cerrar sesión",
      url: "/folder/Login",
      iosIcon: warningOutline,
      mdIcon: warningSharp,
      click: props.setIsLogged,
    },
  ];

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                  onClick={(e) => index === 7 && appPage.click(false)}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index} routerLink={label.title}>
              <IonIcon aria-hidden="true" slot="start" icon={bookmarkOutline} />
              <IonLabel>{label.title}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
}
