import { useEffect, useRef, useState } from "react";
import "./Window.css";
import {
  lockClosedOutline,
  reloadOutline,
  ellipsisVertical,
  close,
  contract,
  expand,
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import NewsSite from "./WebContentPages/News";
import HackerForum from "./WebContentPages/HackerForum";

type WindowProps = {
  title: string;
  isOpen: boolean;
  onClose: any;
};

const Window: React.FC<WindowProps> = ({ isOpen, onClose }) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });
  const [url, setUrl] = useState("https://my.fake.website");

  const onMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current) {
      const bounds = windowRef.current.getBoundingClientRect();
      setRel({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
    }
    setDragging(true);
    e.preventDefault();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (dragging) {
      setPos({ x: e.clientX - rel.x, y: e.clientY - rel.y });
    }
  };

  const onMouseUp = () => setDragging(false);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, rel]);

  return isOpen ? (
    <div ref={windowRef} className="window" style={{ top: pos.y, left: pos.x }}>
      <div className="fake-browser">
        {/* Tab Bar */}
        <div className="tab-bar" onMouseDown={onMouseDown}>
          <div className="tab active">My Fake Website</div>
          <div>

          <IonIcon className="window-tab-btn" icon={expand} onClick={onClose}/>          
          <IonIcon className="window-tab-btn" icon={close} onClick={onClose}/>
          </div>
        </div>

        {/* Address Bar */}
        <div className="address-bar">
          <IonIcon icon={lockClosedOutline} className="icon lock" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            spellCheck={false}
            className="url-input"
          />
          <IonIcon
            icon={reloadOutline}
            className="icon reload"
            onClick={() => alert("Refreshing!")}
          />
          <IonIcon icon={ellipsisVertical} className="icon menu" />
        </div>

        {/* Content */}
        <div className="page-content">
          <HackerForum />
        </div>
      </div>
    </div>
  ) : null;
};

export default Window;
