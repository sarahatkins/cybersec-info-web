import React from "react";
import "./Email.css";
export interface EmailInterface {
  id: number;
  sender: string;
  subject: string;
  body: string;
  date: string;
  isRead: boolean;
  folder: "Inbox" | "Spam" | "Bin" | "Sent";
}

interface EmailProps {
  selectedEmail: EmailInterface | null;
  onBack: any;
}

const EmailMessage: React.FC<EmailProps> = ({ selectedEmail, onBack }) => {
  return (
    <div className="email-view">
      {selectedEmail ? (
        <>
          <button onClick={() => onBack()}>Back</button>
          <h2>{selectedEmail.subject}</h2>
          <h4>From: {selectedEmail.sender}</h4>
          <p>{selectedEmail.body}</p>
          <small>{selectedEmail.date}</small>
        </>
      ) : (
        <div className="placeholder">Select an email to view</div>
      )}
    </div>
  );
};

export default EmailMessage;
