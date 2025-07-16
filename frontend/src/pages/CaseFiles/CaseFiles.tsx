import { useState, useRef, useEffect } from "react";
import "./CaseFiles.css";
import { IonIcon } from "@ionic/react";
import { close, expand, contract } from "ionicons/icons";
type CommandKey = "help" | "about" | "leaks" | "join";

interface TerminalProps {
  isOpen: boolean;
  onClose: any;
}

const CaseFiles: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const startDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const onDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const endDrag = () => {
    setDragging(false);
  };

  return isOpen ? (
        <div
          className="case-file"
          style={{ left: position.x, top: position.y }}
        >
          <div
            className="case-header"
            onMouseDown={startDrag}
            onMouseUp={endDrag}
          >
            🗂️ Detective Case File
            <button className="close-btn" onClick={() => onClose(false)}>✕</button>
          </div>
          <div className="case-content">
            <p><strong>Suspect Name:</strong> John Doe</p>
            <p><strong>Known Aliases:</strong> JD, The Fox</p>
            <p><strong>Last Known Location:</strong> Dockyard District</p>
            <p><strong>Notes:</strong></p>
            <ul>
              <li>Seen with unidentified associate near Warehouse 12</li>
              <li>May be linked to car theft ring</li>
              <li>Surveillance recommended</li>
            </ul>
          </div>
        </div>
  ): null;
};

export default CaseFiles;
