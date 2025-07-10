import React, { useState } from 'react';
import MessageInput from './MessageInput';
import MessageBubble from './MessageBubble';

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = (msg: string) => {
    if (msg.trim()) {
      setMessages(prev => [...prev, msg]);
    }
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} text={msg} />
        ))}
      </div>
      <MessageInput onSend={sendMessage} />
    </div>
  );
};

export default ChatWindow;
