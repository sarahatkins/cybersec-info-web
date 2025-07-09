import "./Toolbar.css";
import { IonIcon } from "@ionic/react";
import { logoEdge, chatboxEllipses, terminal, menu } from "ionicons/icons";

const Toolbar = () => {
  return (
    <div className="toolbar">
      <div className="toolbar-app-container">
        <div className="toolbar-icon">
          <IonIcon icon={terminal} />
        </div>
        <div className="toolbar-icon">
          <IonIcon icon={chatboxEllipses} />
        </div>
        <div className="toolbar-icon">
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
