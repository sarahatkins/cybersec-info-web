import React, { useState } from "react";
import "./Chatroom.css";

interface Message {
  id: number;
  from: "me" | "them";
  text: string;
  time: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    from: "them",
    text: "Hey detective, got a minute?",
    time: "10:14 AM",
  },
  { id: 2, from: "me", text: "Sure, what’s up?", time: "10:15 AM" },
  {
    id: 3,
    from: "them",
    text: "New lead came in. Warehouse 12 again.",
    time: "10:15 AM",
  },
];

interface ChatroomProps {
  isOpen: boolean;
  onClose: any;
}

const Chatroom: React.FC<ChatroomProps> = ({ isOpen, onClose }) => {
  const [position, setPosition] = useState({ x: 300, y: 150 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const startDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const onDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const endDrag = () => setDragging(false);

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([
      ...messages,
      { id: Date.now(), from: "me", text: input, time: "Now" },
    ]);
    setInput("");
  };

  return isOpen ? (
    <div className="chat-window" style={{ top: position.y, left: position.x }}>
      <div className="chat-header" onMouseDown={startDrag} onMouseUp={endDrag}>
        Teams Chat – Detective HQ
        <button className="close-btn" onClick={() => onClose(false)}>
          ✕
        </button>
      </div>

      <div className="chat-body">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${
              msg.from === "me" ? "from-me" : "from-them"
            }`}
          >
            <div className="message-text">{msg.text}</div>
            <div className="message-time">{msg.time}</div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  ) : null;
};

export default Chatroom;
