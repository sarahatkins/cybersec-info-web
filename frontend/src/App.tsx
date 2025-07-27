import "./App.css";
import { IonApp } from "@ionic/react";
import { GameProvider } from "./context/GameContext";
import FakeDesktop from "./Desktop";
import Login from "./Login";

export default function App() {
  return (
    <IonApp>
      <GameProvider>
        <FakeDesktop />
      </GameProvider>
    </IonApp>
  );
}
