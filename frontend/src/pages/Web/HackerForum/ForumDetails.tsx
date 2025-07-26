import React from "react";
import type { ForumPost } from "../../../components/db";
import "./ForumDetails.css";

interface Props {
  post: ForumPost;
  onBack: () => void;
}

const ForumDetails: React.FC<Props> = ({ post, onBack }) => {
  return (
    <div className="post-detail">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <h2>{post.title}</h2>
      <p className="author">by {post.author.username}</p>
      <div className="content">{post.content}</div>
      <div className="comments-section">
        <h4>Comments</h4>
        {post.comments.map((c, i) => (
          <div key={i} className="comment">
            <strong>{c.author_id}</strong>: {c.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumDetails;
