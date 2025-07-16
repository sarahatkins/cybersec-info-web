import React from "react";
import "./HackerForum.css";

interface Thread {
  id: number;
  title: string;
  author: string;
  replies: number;
  lastActive: string;
}

const threads: Thread[] = [
  {
    id: 1,
    title: "Zero-day exploits discussion",
    author: "cyber_shadow",
    replies: 24,
    lastActive: "5 mins ago",
  },
  {
    id: 2,
    title: "New encryption algorithms",
    author: "crypt0queen",
    replies: 12,
    lastActive: "20 mins ago",
  },
  {
    id: 3,
    title: "Best VPN services 2025",
    author: "anon_ghost",
    replies: 30,
    lastActive: "1 hour ago",
  },
  {
    id: 4,
    title: "Social engineering tips",
    author: "hackerman",
    replies: 8,
    lastActive: "2 hours ago",
  },
];

const HackerForum: React.FC = () => {
  return (
    <div className="app-container">
      <header className="header">
        <h1>DarkNet Forum</h1>
        <nav>
          <a href="#">Home</a>
          <a href="#">Threads</a>
          <a href="#">Rules</a>
          <a href="#">About</a>
        </nav>
      </header>
      <section className="thread-list">
        <table>
          <thead>
            <tr>
              <th>Thread Title</th>
              <th>Author</th>
              <th>Replies</th>
              <th>Last Active</th>
            </tr>
          </thead>
          <tbody>
            {threads.map((thread) => (
              <tr key={thread.id}>
                <td className="thread-title">{thread.title}</td>
                <td>{thread.author}</td>
                <td>{thread.replies}</td>
                <td>{thread.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <footer className="footer">
        <p>© 2025 DarkNet Forum | Keep it secret, keep it safe.</p>
      </footer>
    </div>
  );
};

export default HackerForum;
