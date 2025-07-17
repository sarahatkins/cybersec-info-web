import React, { useState } from "react";
import "./EmailSite.css";
import type { EmailInterface } from "./Email";
import EmailMessage from "./Email";
import { IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { pencil } from "ionicons/icons";

const mockEmails: EmailInterface[] = [
  {
    id: 1,
    sender: "alice@example.com",
    subject: "Team Meeting",
    body: "Reminder: team meeting at 10 AM.",
    date: "2025-07-16",
    isRead: false,
    folder: "Inbox",
  },
  {
    id: 2,
    sender: "bob@example.com",
    subject: "Project Update",
    body: "The new version has been deployed successfully.",
    date: "2025-07-15",
    isRead: true,
    folder: "Sent"
  },
];

export const SIDEBAR_OPTIONS = ["Inbox", "Sent", "Spam", "Bin"];

const EmailSite: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string>("Inbox");
  const [selectedEmail, setSelectedEmail] = useState<EmailInterface | null>(
    null
  );

  const setEmailRead = (e: EmailInterface) => {
    e.isRead = true;
  };

  return (
    <div className="email-site">
      {/* Sidebar */}
      <div className="email-sidebar">
        <button className="email-write">
          <IonIcon icon={pencil} />
          Write
        </button>
        {SIDEBAR_OPTIONS.map((folder) => (
          <div
            key={folder}
            className={`email-sidebar-item ${
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
        <EmailMessage
          selectedEmail={selectedEmail}
          onBack={() => setSelectedEmail(null)}
        />
      ) : (
        <div className="email-container">
          <div className="email-list">
            {mockEmails.map((email) => (
              <IonGrid
                key={email.id}
                className={` email-item ${!email.isRead ? "unread-email" : ""}`}
                onClick={() => {
                  setSelectedEmail(email);
                  setEmailRead(email);
            
                }}
              >
                <IonRow>
                  <IonCol size="1">
                    <input type="checkbox" title="Select" />
                  </IonCol>
                  <IonCol className="email-summary">
                    <p className="summary-person">{email.sender}</p>
                    <p className="summary-person">{email.subject}</p>
                    <p>{email.body}</p>
                    {!email.isRead && <span className="unread-dot">●</span>}
                  </IonCol>
                </IonRow>
              </IonGrid>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailSite;
