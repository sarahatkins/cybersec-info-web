import { useEffect, useState } from "react";
import "./CreateEmail.css";

interface CreateEmailProps {
  sendTo?: string;
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
  
  useEffect(() => {
    setEmailInfo(emailText);
  }, [emailText]);

  useEffect(() => {
    setSenderEmail && setSenderEmail(senderTo)
  }, [senderTo])

  return (
    <div className="reply-container">
      <div className="reply-header">
        <div>
          <strong>From:</strong> you@yourmail.com
        </div>
        <div>
          <strong>To:</strong> {sendTo ? sendTo : <input placeholder="Send to..." value={sendTo} onChange={(e) => setSenderTo(e.target.value)}/>}
        </div>
      </div>
      <textarea
        className="reply-textarea"
        placeholder="Write your reply..."
        value={emailText}
        onChange={(e) => setEmailText(e.target.value)}
      />
      <div className="reply-actions">
        <button className="send-btn" onClick={handleSend}>
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
