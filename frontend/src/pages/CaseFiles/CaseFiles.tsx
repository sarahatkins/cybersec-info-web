import React, { useState, useEffect, useRef } from "react";
import "./CaseFiles.css";
import { IonIcon } from "@ionic/react";
import { close, expand, contract } from "ionicons/icons";

interface CaseFilesProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Case {
  id: number;
  name: string;
  aliases: string[];
  location: string;
  notes: string[];
}

const caseData: Case[] = [
  {
    id: 1,
    name: "John Doe",
    aliases: ["JD", "The Fox"],
    location: "Dockyard District",
    notes: [
      "Seen with unidentified associate near Warehouse 12",
      "May be linked to car theft ring",
      "Surveillance recommended",
    ],
  },
  {
    id: 2,
    name: "Maria Espinoza",
    aliases: ["Red Viper"],
    location: "Eastside Market",
    notes: [
      "Runs an underground gambling ring",
      "Highly mobile – changes phones weekly",
      "Possibly working with international contacts",
    ],
  },
];

const CaseFiles: React.FC<CaseFilesProps> = ({ isOpen, onClose }) => {
  const [position, setPosition] = useState({ x: 150, y: 150 });
  const [dragging, setDragging] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [activeCase, setActiveCase] = useState<Case>(caseData[0]);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (fullscreen) return;
    setDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  if (!isOpen) return null;

  return (
    <div
      className={`case-file-window ${fullscreen ? "fullscreen" : ""}`}
      style={!fullscreen ? { top: position.y, left: position.x } : {}}
    >
      <div className="case-header" onMouseDown={handleMouseDown}>
        <div className="title">🗂️ Detective Case File</div>
        <div className="header-actions">
          <IonIcon
            icon={fullscreen ? contract : expand}
            onClick={() => setFullscreen(!fullscreen)}
          />
          <IonIcon icon={close} onClick={onClose} />
        </div>
      </div>

      <div className="case-selector">
        {caseData.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCase(c)}
            className={activeCase.id === c.id ? "active" : ""}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="case-content">
        <p><strong>Suspect Name:</strong> {activeCase.name}</p>
        <p><strong>Known Aliases:</strong> {activeCase.aliases.join(", ")}</p>
        <p><strong>Last Known Location:</strong> {activeCase.location}</p>
        <p><strong>Notes:</strong></p>
        <ul>
          {activeCase.notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CaseFiles;
