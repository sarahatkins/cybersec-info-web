import React, { useEffect, useState } from "react";
import "./Email.css";
import type {
  EmailInterface,
  EmailThreadInterface,
} from "../../../../components/db";

interface EmailProps {
  selectedEmail: EmailInterface | null;
  onBack: any;
}

const EmailMessage: React.FC<EmailProps> = ({ selectedEmail, onBack }) => {
  const [showReplyBox, setShowReplyBox] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>("");
  const [thread, setThread] = useState<EmailThreadInterface[]>(
    selectedEmail?.thread || []
  );

  useEffect(() => {
    // Reset thread when selectedEmail changes
    setThread(selectedEmail?.thread || []);
  }, [selectedEmail]);

  const handleReply = () => {
    const newReply: EmailThreadInterface = {
      id: thread.length,
      body: replyText,
      date: new Date().toISOString(),
    };

    setThread([...thread, newReply]);
    setReplyText("");
    setShowReplyBox(false);
  };

  return (
    <div className="email-view">
      {selectedEmail ? (
        <>
          <div>
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

export default EmailMessage;
