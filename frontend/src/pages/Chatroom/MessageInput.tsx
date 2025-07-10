import React, { useState } from 'react';

interface Props {
  onSend: (message: string) => void;
}

const MessageInput: React.FC<Props> = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    onSend(input);
    setInput('');
  };

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Send a message"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') handleSend();
        }}
      />
    </div>
  );
};

export default MessageInput;
