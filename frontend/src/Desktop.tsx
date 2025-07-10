import Terminal from "./pages/Terminal";
import "./Desktop.css";
import Toolbar from "./components/Toolbar";
import Window from "./pages/Web/Window";
import { IonApp } from '@ionic/react';
import { useState } from "react";

export default function FakeDesktop() {
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const [webOpen, setWebOpen] = useState<boolean>(true);
  const [chatOpen, setChatOpen] = useState<boolean>(false);

  return (
    <IonApp>
      <div className="desktop-view">

      <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
      <Window title={""} isOpen={webOpen} onClose={() => setWebOpen(false)}/>
      <Toolbar openTerminal={() => setTerminalOpen(true)} openWeb={() => setWebOpen(true)} openChat={() => setChatOpen(true)} />
      </div>
    </IonApp>
  );
}
