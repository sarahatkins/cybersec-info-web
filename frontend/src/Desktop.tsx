import Terminal from "./pages/Terminal";
import "./Desktop.css";
import Toolbar from "./components/Toolbar";
import { IonApp } from '@ionic/react';
import { useState } from "react";

export default function FakeDesktop() {
  const [terminalOpen, setTerminalOpen] = useState<boolean>(true);
  const [webOpen, setWebOpen] = useState<boolean>(false);
  const [chatOpen, setChatOpen] = useState<boolean>(false);

  return (
    <IonApp>
      <div className="desktop-view">

      <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
      <Toolbar openTerminal={() => setTerminalOpen(true)} openWeb={() => setWebOpen(true)} openChat={() => setChatOpen(true)} />
      </div>
    </IonApp>
  );
}
