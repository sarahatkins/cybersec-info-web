import React, { useState, useRef } from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import './Chatroom.css';

const Chatroom: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 600, height: 400 });
  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  // Dragging handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.current) {
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    } else if (isResizing.current) {
      setSize(prev => ({
        width: Math.max(300, e.clientX - position.x),
        height: Math.max(200, e.clientY - position.y),
      }));
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    isResizing.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  if (!isOpen) return null;

  return (
    <div
      className="chatroom-wrapper"
      style={{
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
      }}
    >
      <div className="chatroom-header" onMouseDown={handleMouseDown}>
        <span>Fake Discord Chatroom</span>
        <button onClick={() => setIsOpen(false)}>×</button>
      </div>

      <div className="chatroom">
        <Sidebar />
        <ChatWindow />
      </div>

      <div className="resize-handle" onMouseDown={handleResizeMouseDown} />
    </div>
  );
};

export default Chatroom;
