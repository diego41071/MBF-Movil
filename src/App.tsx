import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Page from "./pages/Page/Page";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useState } from "react";

setupIonicReact();

const App: React.FC = () => {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          {isLogged && <Menu setIsLogged={setIsLogged} />}
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/folder/Login" />
            </Route>
            <Route path="/folder/Login" exact={true}>
              <Login setIsLogged={setIsLogged} />
            </Route>
            <Route path="/folder/Page" exact={true}>
              <Page />
            </Route>
            <Route path="/folder/Register" exact={true}>
              <Register setIsLogged={setIsLogged} />
            </Route>
            {/* <Route path="/folder/:name" exact={true}>
              <Page />
            </Route> */}
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
