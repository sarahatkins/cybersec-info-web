import "./Toolbar.css";
import { IonIcon } from "@ionic/react";
import {
  logoEdge,
  chatboxEllipses,
  terminal,
  menu,
} from "ionicons/icons";
import { useGame } from "../context/GameContext";

interface ToolbarProps {
  openTerminal: any;
  openWeb: any;
  openChat: any;
}

const Toolbar: React.FC<ToolbarProps> = ({
  openTerminal,
  openWeb,
  openChat,
}) => {
  const { newEmail, newMessage, setNewMessage } = useGame();

  return (
    <div className="toolbar">
      <div className="toolbar-app-container">
        <div className="toolbar-icon" onClick={() => openTerminal()}>
          <IonIcon icon={terminal} />
        </div>
        <div
          className={`toolbar-icon ${newMessage ? "notification" : ""}`}
          onClick={() => {
            openChat();
            setNewMessage(false);
          }}
        >
          <IonIcon icon={chatboxEllipses} />
        </div>

        <div
          className={`toolbar-icon ${newEmail ? "notification" : ""}`}
          onClick={() => {
            openWeb();
          }}
        >
          <IonIcon icon={logoEdge} />
        </div>
      </div>
      <div className="toolbar-icon">
        <IonIcon icon={menu} />
      </div>
    </div>
  );
};

export default Toolbar;
