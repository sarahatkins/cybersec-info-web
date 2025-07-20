import React, { useState } from 'react';

interface ChatViewProps {
  person: any;
  messages: any;
  onSend: any;
}

const ChatView: React.FC<ChatViewProps> = ({ person, messages, onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    onSend(input);
    setInput('');
  };

  return (
    <div className="chat-view">
      <h3>{person.name}</h3>
      <div className="chat-messages">
        {messages.map((msg: string, idx: number) => (
          <div key={idx} className="chat-msg">{msg}</div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatView;
