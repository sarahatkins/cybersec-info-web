import React, { useEffect, useState } from "react";
import "./Email.css";
import {
  addReplyToEmail,
  game_emails,
  type EmailInterface,
  type EmailThreadInterface,
} from "../../../../components/db";
import { useGame } from "../../../../context/GameContext";
interface EmailProps {
  selectedEmail: EmailInterface;
  onBack: any;
}

const EmailMessage: React.FC<EmailProps> = ({ selectedEmail, onBack }) => {
  const [showReplyBox, setShowReplyBox] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>("");
  const { gameStage, setGameStage } = useGame();
  const [thread, setThread] = useState<EmailThreadInterface[]>(
    selectedEmail?.thread || []
  );

  useEffect(() => {
    // Reset thread when selectedEmail changes
    const updatedThread = game_emails.find(
      (e) => e.id === selectedEmail?.id
    )?.thread;
    setTimeout(() => {
      setThread(updatedThread || []);
    }, 1500);
  }, [gameStage]);

  const handleReply = () => {
    const newReply: EmailThreadInterface = {
      id: thread.length,
      body: replyText,
      date: new Date().toISOString(),
    };

    setThread([...thread, newReply]);
    setReplyText("");
    handleReplyStaging(selectedEmail, newReply, gameStage, setGameStage);
    setShowReplyBox(false);
  };

  return (
    <div className="email-view">
      {selectedEmail ? (
        <>
          <div className="email-btn">
            <button onClick={onBack}>Back</button>
            <button onClick={() => setShowReplyBox(true)}>Reply</button>
          </div>
          <h2>{selectedEmail.subject}</h2>
          <h4>From: {selectedEmail.sender}</h4>
          {thread.map((info, index) => (
            <div className="thread-info" key={index}>
              <p dangerouslySetInnerHTML={{ __html: info.body }} />
              <small>{info.date}</small>
            </div>
          ))}
          {showReplyBox && (
            <div>
              Reply:
              <input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button onClick={handleReply}>Send</button>
            </div>
          )}
        </>
      ) : (
        <div className="placeholder">Select an email to view</div>
      )}
    </div>
  );
};

export function handleReplyStaging(
  email: EmailInterface,
  reply: EmailThreadInterface,
  gameStage: number,
  setGameStage: any
) {
  addReplyToEmail(email.id, reply);

  // Now handle game transitions based on logic
  if (email.sender === "alison@cybersec.com" && gameStage === 0) {
    setGameStage(1);
  }

  if (
    email.sender === "alison@cybersec.com" &&
    gameStage === 1 
    // &&reply.body.includes("honey pot")
  ) {
    setGameStage(2);
  }
}

export default EmailMessage;
