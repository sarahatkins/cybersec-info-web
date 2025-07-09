import Terminal from "./pages/Terminal";
import "./Desktop.css";
import Toolbar from "./components/Toolbar";
import { IonApp } from '@ionic/react';

export default function FakeDesktop() {
  return (
    <IonApp>
      <div className="desktop-view">

      {/* <Terminal /> */}
      <Toolbar />
      </div>
    </IonApp>
  );
}
