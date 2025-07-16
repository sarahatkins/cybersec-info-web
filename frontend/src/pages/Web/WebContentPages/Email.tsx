import React, { useState } from 'react';
import './Email.css';

interface Email {
  id: number;
  sender: string;
  subject: string;
  body: string;
  date: string;
  isRead: boolean;
}

const mockEmails: Email[] = [
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
  }
];

const EmailSite: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string>('Inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        {['Inbox', 'Sent', 'Drafts'].map(folder => (
          <div
            key={folder}
            className={`sidebar-item ${selectedFolder === folder ? 'active' : ''}`}
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
      <div className="email-list">
        {mockEmails.map(email => (
          <div
            key={email.id}
            className={`email-item ${selectedEmail?.id === email.id ? 'selected' : ''}`}
            onClick={() => setSelectedEmail(email)}
          >
            <strong>{email.subject}</strong>
            <p>{email.sender}</p>
            {!email.isRead && <span className="unread-dot">●</span>}
          </div>
        ))}
      </div>

      {/* Email Viewer */}
      <div className="email-view">
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
      </div>
    </div>
  );
};

export default EmailSite;
