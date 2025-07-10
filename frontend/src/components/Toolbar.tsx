import "./Toolbar.css";
import { IonIcon } from "@ionic/react";
import { logoEdge, chatboxEllipses, terminal, menu } from "ionicons/icons";

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
  return (
    <div className="toolbar">
      <div className="toolbar-app-container">
        <div className="toolbar-icon" onClick={() => openTerminal()}>
          <IonIcon icon={terminal} />
        </div>
        <div className="toolbar-icon" onClick={() => openWeb()}>
          <IonIcon icon={chatboxEllipses} />
        </div>
        <div className="toolbar-icon" onClick={() => openChat()}>
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
