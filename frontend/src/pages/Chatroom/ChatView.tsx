import React, { useEffect, useState } from "react";
import {
  user_messages,
  type MessageInterface,
  type Person,
} from "../../components/db";
import "./ChatView.css";
interface ChatViewProps {
  person: Person;
  messages: MessageInterface[];
  onSend: any;
}

const ChatView: React.FC<ChatViewProps> = ({ person, messages, onSend }) => {
  const [input, setInput] = useState("");
  const [messageThread, setMessageThread] = useState<MessageInterface[]>(
    messages || []
  );
  const handleSend = () => {
    onSend(input);
    setInput("");
  };
  useEffect(() => {
    const updatedThread = user_messages.find(
      (e) => e.chat_with_id === person.id
    )?.message_thread;

    if (updatedThread) {
      setMessageThread(updatedThread);
    } else {
      setMessageThread([]);
    }
  }, [user_messages, person.id]);
  return (
    <div className="chat-view">
      <div className="chat-view-header">
        {person.avatar}
        {person.name}
      </div>
      <div className="chat-messages">
        {messageThread.map((msg: MessageInterface, idx: number) => {
          const prevMsg = messageThread[idx - 1];
          const showSender = !prevMsg || prevMsg.from_id !== msg.from_id;

          return (
            <div
              key={idx}
              className={`chat-msg ${
                msg.from_id === person.id ? "other-sent" : ""
              }`}
            >
              {showSender && (
                <div className="chat-msg-sender">
                  {msg.from_id === person.id ? person.name : "YOU"}
                </div>
              )}
              <div className="chat-msg-content">{msg.content}</div>
            </div>
          );
        })}
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
