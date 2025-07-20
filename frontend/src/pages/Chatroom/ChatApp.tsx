import React, { useState, useRef, useEffect } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import "./ChatApp.css";
import ChatList from "./ChatList";
import ChatView from "./ChatView";
import CallView from "./CallView";

interface ChatAppProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Person {
  id: number;
  name: string;
  avatar: string;
}

const people: Person[] = [
  { id: 1, name: "Mona Kane", avatar: "👩‍🎨" },
  { id: 2, name: "Eric Ishida", avatar: "👨‍💻" },
  { id: 3, name: "Marketing Team", avatar: "📊" },
];

const MIN_WIDTH = 400;
const MIN_HEIGHT = 300;

const TeamsWindow: React.FC<ChatAppProps> = ({ isOpen, onClose }) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 800, height: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [selectedPerson, setSelectedPerson] = useState<Person>(people[0]);
  const [activeTab, setActiveTab] = useState<"chat" | "call">("chat");
  const [messages, setMessages] = useState<Record<number, string[]>>({
    1: ["Hey there!"],
    2: ["Meeting at 3PM"],
    3: ["Design review slides are ready"],
  });

  const handleMouseDownDrag = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (isFullscreen) return;
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseDownResize = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (isFullscreen) return;
    e.stopPropagation();
    setIsResizing(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    } else if (isResizing) {
      const newWidth = e.clientX - position.x;
      const newHeight = e.clientY - position.y;
      setSize({
        width: Math.max(newWidth, MIN_WIDTH),
        height: Math.max(newHeight, MIN_HEIGHT),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => ({
      ...prev,
      [selectedPerson.id]: [...(prev[selectedPerson.id] || []), `You: ${text}`],
    }));
  };

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      className={`teams-window ${isFullscreen ? "fullscreen" : ""}`}
      style={
        isFullscreen
          ? {}
          : {
              top: position.y,
              left: position.x,
              width: size.width,
              height: size.height,
            }
      }
    >
      {/* Header */}
      <div className="teams-header" onMouseDown={handleMouseDownDrag}>
        <div className="header-left">🧑‍💻 Fake Teams</div>
        <div className="tabs">
          <button
            className={activeTab === "chat" ? "active" : ""}
            onClick={() => setActiveTab("chat")}
          >
            💬 Chat
          </button>
          <button
            className={activeTab === "call" ? "active" : ""}
            onClick={() => setActiveTab("call")}
          >
            📞 Call
          </button>
        </div>
        <div className="window-controls">
          <button onClick={() => setIsFullscreen(!isFullscreen)}>
            {isFullscreen ? "🗗" : "🗖"}
          </button>
          <button onClick={onClose}>✖</button>
        </div>
      </div>

      {/* Body */}
      <div className="teams-body">
        <ChatList
          people={people}
          selectedId={selectedPerson.id}
          onSelect={setSelectedPerson}
        />
        <div className="teams-content">
          {activeTab === "chat" ? (
            <ChatView
              person={selectedPerson}
              messages={messages[selectedPerson.id] || []}
              onSend={handleSendMessage}
            />
          ) : (
            <CallView person={selectedPerson} />
          )}
        </div>
      </div>

      {/* Resize Handle */}
      {!isFullscreen && (
        <div className="resize-handle" onMouseDown={handleMouseDownResize} />
      )}
    </div>
  );
};

export default TeamsWindow;
