import React from "react";
import "./Email.css";
import type { EmailInterface } from "../../../../components/db";

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
          <p dangerouslySetInnerHTML={{ __html: selectedEmail.body }} />
          <small>{selectedEmail.date}</small>
        </>
      ) : (
        <div className="placeholder">Select an email to view</div>
      )}
    </div>
  );
};

export default EmailMessage;
