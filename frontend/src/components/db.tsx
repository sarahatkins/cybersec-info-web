import EmailSite from "../pages/Web/WebContentPages/EmailSite/EmailSite";
import HackerForum from "../pages/Web/WebContentPages/HackerForum";
import HomeSite from "../pages/Web/WebContentPages/Home";
import NewsSite from "../pages/Web/WebContentPages/News";
import NotFound from "../pages/Web/WebContentPages/NotFound";

export interface EmailThreadInterface {
  id: number;
  body: string;
  date: string;
}
export interface EmailInterface {
  id: number;
  sender: string;
  subject: string;
  summary: string;
  thread: EmailThreadInterface[];
  isRead: boolean;
  folder: "Inbox" | "Spam" | "Bin" | "Sent";
}

export const game_emails: EmailInterface[] = [
  {
    id: 0,
    sender: "alison@cybersec.com",
    subject: "Hacker Forum Link",
    thread: [
      {
        id: 0,
        body: `<p>Hey,</p>
  <p>Thanks for coming to my lecture.</p>
  <p>Here is the link you requested: <a href="https://hackerforum.com">hackerforum.com</a></p>
  <p>Alison</p>`,
        date: "2025-07-16",
      },
    ],
    summary: "Hey, Thanks for coming to my lecture...",
    isRead: false,
    folder: "Inbox",
  },
];

export const websiteMap: Record<string, React.FC> = {
  "https://home.com": HomeSite,
  "https://hackerforum.com": HackerForum,
  "https://your-emails.com": EmailSite,
  "https://global-news.com": NewsSite,
  "https://unknown-address.com": NotFound,
};

export interface Person {
  id: number;
  name: string;
  avatar: string;
}

export const game_chat_users: Person[] = [
  { id: 0, name: "YOU", avatar: "👩‍🎨" },
  { id: 1, name: "Boss", avatar: "👩‍🎨" },
  { id: 2, name: "Eric Ishida", avatar: "👨‍💻" },
  { id: 3, name: "Marketing Team", avatar: "📊" },
];

export interface MessageThread {
  to_id: number;
  from_id: number;
  content: string;
}

export interface UserChats {
  chat_with_id: number;
  message_thread: MessageThread[];
}

export const user_messages: UserChats[] = [
  {
    chat_with_id: 1,
    message_thread: [
      { to_id: 0, from_id: 1, content: "Make sure it gets done." },
      { to_id: 1, from_id: 0, content: "It will." },
    ],
  },
];
