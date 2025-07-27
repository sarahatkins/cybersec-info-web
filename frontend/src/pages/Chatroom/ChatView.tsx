import React, { useEffect, useRef, useState } from "react";
import {
  game_chat_users,
  user_messages,
  type MessageInterface,
  type Person,
} from "../../components/db";
import "./ChatView.css";
import { useGame } from "../../context/GameContext";
interface ChatViewProps {
  person: Person;
  messages: MessageInterface[];
  onSend: any;
}

const ChatView: React.FC<ChatViewProps> = ({ person, messages, onSend }) => {
  const { gameStage, setGameStage, setGameFinished } = useGame();
  const bottomRef = useRef<HTMLDivElement | null>(null);

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

    setMessageThread(updatedThread || []);
  }, [user_messages, person.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageThread]);
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
        <div ref={bottomRef} />
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={() => {
            handleSend();
            handleReplyStaging(person.id, input, gameStage, setGameStage, setGameFinished);
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export function handleReplyStaging(
  to_id: number,
  reply: string,
  gameStage: number,
  setGameStage: any,
  setGameFinished: any
) {
  const find_user = game_chat_users.find((e) => e.id === to_id)?.name;
  // Now handle game transitions based on logic
  if (!find_user) return;

  if (
    find_user === "Boss" &&
    gameStage === 13 &&
    reply.toLocaleLowerCase().includes("paras") &&
    reply.toLocaleLowerCase().includes("josiah")
  ) {
    setGameFinished(true)
    return;
  }

  const stageTransitions: Record<string, Record<number, number>> = {
    Boss: {
      4: 5,
    },
    Researchers: {
      2: 3,
      3: 4,
      // 5: 6, - news
      6: 7,
      11: 12,
      12: 13,
    },
  };

  const nextStage = stageTransitions[find_user]?.[gameStage];
  if (nextStage !== undefined) {
    setGameStage(nextStage);
  }
}

export default ChatView;
