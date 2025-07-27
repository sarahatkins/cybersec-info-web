import React, { useEffect, useRef, useState } from "react";
import "./Email.css";
import {
  addReplyToEmail,
  game_emails,
  PLAYER_EMAIL,
  type EmailInterface,
  type EmailThreadInterface,
} from "../../../../components/db";
import { useGame } from "../../../../context/GameContext";
import CreateEmail from "./CreateEmail";
interface EmailProps {
  creatingEmail?: boolean;
  selectedEmail: EmailInterface;
  onBack: any;
}

const EmailMessage: React.FC<EmailProps> = ({
  creatingEmail,
  selectedEmail,
  onBack,
}) => {
  const [showReplyBox, setShowReplyBox] = useState<boolean>(
    creatingEmail || false
  );
  const [replyText, setReplyText] = useState<string>("");
  const { gameStage, setGameStage } = useGame();
  const [thread, setThread] = useState<EmailThreadInterface[]>(
    selectedEmail?.thread || []
  );

  const bottomRef = useRef<HTMLDivElement>(null);

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

  const handleCreateEmail = (
    receiver: string,
    subject: string,
    thread: EmailThreadInterface
  ) => {
    const newEmail: EmailInterface = {
      id: game_emails.length,
      sender: PLAYER_EMAIL,
      receiver: receiver,
      subject: subject,
      summary: thread.body.slice(0, 50) + "...",
      thread: [thread],
      isRead: true,
      folder: "Sent",
    };

    game_emails.unshift(newEmail);
    handleCreateStaging(newEmail, gameStage, setGameStage)
    onBack();
  };

  return (
    <div className="email-view">
      <div className="email-btn">
        <button onClick={onBack}>Back</button>
        {!creatingEmail && (
          <button
            onClick={() => {
              setShowReplyBox(true);
              setTimeout(() => {
                bottomRef.current?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          >
            Reply
          </button>
        )}
      </div>
      {!creatingEmail && (
        <>
          <h2 className="email-view-header">{selectedEmail.subject}</h2>
          <h4>From: {selectedEmail.sender}</h4>
          {thread.map((info, index) => (
            <div className="thread-info" key={index}>
              <p dangerouslySetInnerHTML={{ __html: info.body }} />
              <small>{info.date}</small>
            </div>
          ))}
        </>
      )}

      {showReplyBox && (
        <CreateEmail
          setEmailInfo={setReplyText}
          setShowCreate={setShowReplyBox}
          handleSend={creatingEmail ? handleCreateEmail : handleReply}
          sendTo={creatingEmail ? null : selectedEmail.sender}
        />
      )}

      <div ref={bottomRef}></div>
    </div>
  );
};

function handleReplyStaging(
  email: EmailInterface,
  reply: EmailThreadInterface,
  gameStage: number,
  setGameStage: any
) {
  addReplyToEmail(email.id, reply);

  // Define stage transitions based on sender and current stage
  const stageTransitionsSender: Record<string, Record<number, number>> = {
    "alison@cybersec.com": {
      0: 1,
      1: 2,
    },
  };

  let nextStage = stageTransitionsSender[email.sender]?.[gameStage];
  if (nextStage !== undefined) {
    setGameStage(nextStage);
    return;
  }
}

function handleCreateStaging(
  email: EmailInterface,
  gameStage: number,
  setGameStage: any
) {
  // Define stage transitions based on sender and current stage
  const stageTransitionsReceiver: Record<string, Record<number, number>> = {
    "backconnect@backconnect.com": {
      7: 8,
    },
    "paras.jha@protraf.com": {
      8: 9,
    },
    "josiah.white@protraf.com": {
      10: 11,
    },
  };

  console.log(email.receiver);
  const nextStage = stageTransitionsReceiver[email.receiver]?.[gameStage];
  console.log(gameStage, nextStage)
  if (nextStage !== undefined) {
    setGameStage(nextStage);
    console.log("next stage");
    return;
  }
}

export default EmailMessage;
