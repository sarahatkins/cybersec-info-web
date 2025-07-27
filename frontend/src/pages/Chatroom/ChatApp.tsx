import React, { useState, useRef, useEffect } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import "./ChatApp.css";
import ChatView from "./ChatView";
import {
  game_chat_users,
  type MessageInterface,
  user_messages,
  type Person,
} from "../../components/db";
import { useGame } from "../../context/GameContext";

interface ChatAppProps {
  isOpen: boolean;
  onClose: () => void;
}
const MIN_WIDTH = 400;
const MIN_HEIGHT = 300;

const ChatApp: React.FC<ChatAppProps> = ({ isOpen, onClose }) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const {gameStage} = useGame();

  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 800, height: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [selectedPerson, setSelectedPerson] = useState<Person>(
    game_chat_users[0]
  );
  const [messages, setMessages] = useState<MessageInterface[]>([]);

  useEffect(() => {
    const specChatMessages = user_messages.find(
      (chat) => chat.chat_with_id === selectedPerson.id
    );
    setTimeout(() => {
      specChatMessages
      ? setMessages(specChatMessages.message_thread)
      : setMessages([]);
    }, 2000)
  }, [selectedPerson, gameStage]);

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
    const newMessage: MessageInterface = {
      from_id: 0,
      content: text,
    };

    setMessages((prev) => [...prev, newMessage]);
    const specChatMessages = user_messages.find(
      (chat) => chat.chat_with_id === selectedPerson.id
    );
    specChatMessages?.message_thread.push(newMessage);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      className={`chat-app-window ${isFullscreen ? "fullscreen" : ""}`}
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
      <div className="chat-app-header" onMouseDown={handleMouseDownDrag}>
        <div className="header-left">Chat App</div>
        <div className="window-controls">
          <button onClick={() => setIsFullscreen(!isFullscreen)}>
            {isFullscreen ? "🗗" : "🗖"}
          </button>
          <button onClick={onClose}>✖</button>
        </div>
      </div>

      <div className="chat-app-body">
        {/* Sidebar */}
        <div className="chat-app-sidebar">
          {game_chat_users.map((user: Person, _: number) => {
            return (
              <div
                key={user.id}
                className={`chatlist-item ${
                  user.id === selectedPerson.id ? "selected" : ""
                }`}
                onClick={() => setSelectedPerson(user)}
              >
                <div className="avatar">{user.avatar}</div>
                <div className="name">{user.name}</div>
              </div>
            );
          })}
        </div>

        <div className="chat-app-content">
          <ChatView
            person={selectedPerson}
            messages={messages}
            onSend={handleSendMessage}
          />
        </div>
      </div>

      {/* Resize Handle */}
      {!isFullscreen && (
        <div className="resize-handle" onMouseDown={handleMouseDownResize} />
      )}
    </div>
  );
};

export default ChatApp;
