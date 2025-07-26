import { useEffect } from "react";
import EmailSite from "../pages/Web/WebContentPages/EmailSite/EmailSite";
import HackerForum from "../pages/Web/HackerForum/HackerForum";
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

export function addReplyToEmail(emailId: number, reply: EmailThreadInterface) {
  const email = game_emails.find((e) => e.id === emailId);
  if (email) {
    email.thread.push(reply);
  }
}

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
];

export interface MessageInterface {
  from_id: number;
  content: string;
}

export interface UserChats {
  chat_with_id: number;
  message_thread: MessageInterface[];
}

export const user_messages: UserChats[] = [
  {
    chat_with_id: 1,
    message_thread: [
      { from_id: 1, content: "Make sure it gets done." },
      { from_id: 0, content: "It will." },
    ],
  },
];

export const honey_pot_logs: string[] = [
"[+] Launching Watchtower v3.2.1",
"[+] Mode: Honeypot Monitoring",
"[+] Loading attack signatures... done.",
"[+] Tracking inbound traffic on ports 22, 23, 80, 443, 8080...",

"[13:01:23] [TELNET] Mirai probe from 185.244.25.4: SYN on port 23",
"[13:01:27] [SSH] Brute-force login attempt from 122.54.87.23 - root/admin123",
"[13:02:10] [TCP] SYN flood detected from 198.51.100.12 on port 22",
"[13:02:31] [HTTP] Command injection payload from 203.0.113.99",
"[13:02:58] [TELNET] Session closed by remote 185.244.25.4",

"[13:03:02] [SSH] 450 brute-force attempts blocked from 142.250.72.238",
"[13:03:45] [MIRAI] Binary signature match: /bin/busybox detected",
"[13:04:09] [SCAN] Port scan from 94.102.49.189 - 1000 ports hit in 0.47s",
"[+] No successful intrusions detected. System integrity: INTACT.",
];

export interface ForumPost {
  id: number;
  author: HackerUser;
  title: string;
  content: string;
  comments: PostComment[];
}

export interface PostComment {
  id: number;
  author_id: string;
  content: string;
}

export interface HackerUser {
  id: number;
  username: string;
}

export const hackerUsers: HackerUser[] = [
  {id: 0, username: "LiteSpeed"}
]

export const forumPosts: ForumPost[] = [
  {
    id: 0,
    title: "Zero-day exploits discussion",
    author: {id: 0, username: "LiteSpeed"},
    content: "",
    comments: [],
  },
  {
    id: 1,
    title: "Zero-day exploits discussion",
    author: {id: 0, username: "LiteSpeed"},
    content: "",
    comments: [],
  },
  {
    id: 2,
    title: "Zero-day exploits discussion",
    author: {id: 0, username: "LiteSpeed"},
    content: "",
    comments: [],
  },
  {
    id: 3,
    title: "Zero-day exploits discussion",
    author: {id: 0, username: "LiteSpeed"},
    content: "",
    comments: [],
  },
]
