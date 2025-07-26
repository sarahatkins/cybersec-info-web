import React, { useState } from "react";
import type { MessageInterface, Person } from "../../components/db";
import "./ChatView.css";
interface ChatViewProps {
  person: Person;
  messages: MessageInterface[];
  onSend: any;
}

const ChatView: React.FC<ChatViewProps> = ({ person, messages, onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    onSend(input);
    setInput("");
  };

  return (
    <div className="chat-view">
      <div className="chat-view-header">
        {person.avatar}
        {person.name}
      </div>
      <div className="chat-messages">
        {messages.map((msg: MessageInterface, _: number) => (
          <div className="chat-msg">
            <div>
              {msg.from_id === person.id ? person.name : "Bilbo Baggins"}
            </div>
            <div>{msg.content}</div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatView;
