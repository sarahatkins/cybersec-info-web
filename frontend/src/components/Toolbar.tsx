import "./Toolbar.css";
import { IonIcon } from "@ionic/react";
import {
  logoEdge,
  chatboxEllipses,
  terminal,
  menu,
} from "ionicons/icons";
import { useGame } from "../context/GameContext";
import { useEffect, useRef, useState } from "react";

interface ToolbarProps {
  openTerminal: any;
  openWeb: any;
  openChat: any;
  logout: any;
}

const Toolbar: React.FC<ToolbarProps> = ({
  openTerminal,
  openWeb,
  openChat,
  logout
}) => {
  const { newEmail, newMessage, setNewMessage } = useGame();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setShowMenu(false);
    }
  };

    useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    alert("If you haven't save all your progress will be lost... :(");
    setShowMenu(false);
    logout();
  };
  
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
      <div className="toolbar-icon" onClick={() => setShowMenu(!showMenu)}>
        <IonIcon icon={menu} />
        {showMenu && (
          <div className="toolbar-menu" ref={menuRef}>
            <div className="menu-item" onClick={handleLogout}>🚪 Logout</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
