import { useEffect, useState } from "react";
import "./CreateEmail.css";
import type { EmailThreadInterface } from "../../../../components/db";

interface CreateEmailProps {
  sendTo?: string | null;
  setSenderEmail?: any;
  setEmailInfo: any;
  setShowCreate: any;
  handleSend: any;
}

const CreateEmail: React.FC<CreateEmailProps> = ({
  sendTo,
  setSenderEmail,
  setEmailInfo,
  setShowCreate,
  handleSend,
}) => {
  const [emailText, setEmailText] = useState<string>("");
  const [senderTo, setSenderTo] = useState<string>(sendTo || "");
  const [subject, setSubject] = useState<string>("");
  
  const handleSendClick = () => {
    const thread: EmailThreadInterface = {
      id: 0,
      body: emailText,
      date: new Date().toISOString(),
    };

    handleSend(senderTo, subject, thread);
  };

  useEffect(() => {
    setEmailInfo(emailText);
  }, [emailText]);

  useEffect(() => {
    setSenderEmail && setSenderEmail(senderTo);
  }, [senderTo]);

  return (
    <div className="reply-container">
      <div className="reply-header">
        <div>
          <strong>From:</strong> you@yourmail.com
        </div>
        <div>
          <strong>To:</strong>{" "}
          {sendTo ? (
            sendTo
          ) : (
            <input
              placeholder="Send to..."
              value={senderTo}
              onChange={(e) => setSenderTo(e.target.value)}
            />
          )}
        </div>
        {!sendTo && (
          <>
            <strong>Subject: </strong>
            <input value={subject} onChange={(e) => setSubject(e.target.value)}/>
          </>
        )}
      </div>
      <textarea
        className="reply-textarea"
        placeholder="Write your reply..."
        value={emailText}
        onChange={(e) => setEmailText(e.target.value)}
      />
      <div className="reply-actions">
        <button className="send-btn" onClick={handleSendClick}>
          Send
        </button>
        <button
          className="discard-btn"
          onClick={() => {
            setEmailText("");
            setShowCreate(false);
          }}
        >
          Discard
        </button>
      </div>
    </div>
  );
};

export default CreateEmail;
