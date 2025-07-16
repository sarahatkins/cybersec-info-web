import React, { useState } from "react";
import "./EmailSite.css";
import type { EmailInterface } from "./Email";
import EmailMessage from "./Email";

const mockEmails: EmailInterface[] = [
  {
    id: 1,
    sender: "alice@example.com",
    subject: "Team Meeting",
    body: "Reminder: team meeting at 10 AM.",
    date: "2025-07-16",
    isRead: false,
  },
  {
    id: 2,
    sender: "bob@example.com",
    subject: "Project Update",
    body: "The new version has been deployed successfully.",
    date: "2025-07-15",
    isRead: true,
  },
];

const EmailSite: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string>("Inbox");
  const [selectedEmail, setSelectedEmail] = useState<EmailInterface | null>(null);

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        {["Inbox", "Sent", "Drafts", "Bin"].map((folder) => (
          <div
            key={folder}
            className={`sidebar-item ${
              selectedFolder === folder ? "active" : ""
            }`}
            onClick={() => {
              setSelectedFolder(folder);
              setSelectedEmail(null);
            }}
          >
            {folder}
          </div>
        ))}
      </div>

      {/* Email List */}
      {selectedEmail ? (
        <EmailMessage selectedEmail={selectedEmail} onBack={() => setSelectedEmail(null)} />
      ) : (
        <div className="email-list">
          {mockEmails.map((email) => (
            <div
              key={email.id}
              className={"email-item"}
              onClick={() => setSelectedEmail(email)}
            >
              <strong>{email.subject}</strong>
              <p>{email.sender}</p>
              {!email.isRead && <span className="unread-dot">●</span>}
            </div>
          ))}
        </div>
      )}

      {/* Email Viewer */}
      {/* <div className="email-view">
        {selectedEmail ? (
          <>
            <h2>{selectedEmail.subject}</h2>
            <h4>From: {selectedEmail.sender}</h4>
            <p>{selectedEmail.body}</p>
            <small>{selectedEmail.date}</small>
          </>
        ) : (
          <div className="placeholder">Select an email to view</div>
        )}
      </div> */}
    </div>
  );
};

export default EmailSite;
