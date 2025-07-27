import React, { useEffect, useState } from "react";
import "./HackerForum.css";
import { forumPosts, type ForumPost } from "../../../../components/db";
import ForumDetails from "./ForumDetails";
import { useGame } from "../../../../context/GameContext";

const HackerForum: React.FC = () => {
  const { gameStage, setGameStage } = useGame();
  const [showPost, setShowPost] = useState<boolean>(false);
  const [specificPost, setSpecificPost] = useState<ForumPost>();

  const handlePostClick = (post: ForumPost) => {
    setSpecificPost(post);
    setShowPost(true);
  };

  const handleBack = () => {
    setShowPost(false);
    setSpecificPost(undefined);
  };

  useEffect(() => {
    specificPost && handlePostStaging(specificPost, gameStage, setGameStage);
  }, [specificPost]);
  return (
    <div className="hackerforum-container">
      <header className="forum-header">
        <h1>🛡️ Hacker Forum</h1>
        <nav>
          <a href="#">Home</a>
          <a href="#" className="unlink">
            Categories
          </a>
          <a href="#" className="unlink">
            Messages
          </a>
          <a href="#" className="unlink">
            Account
          </a>
        </nav>
      </header>
      {showPost ? (
        specificPost && <ForumDetails post={specificPost} onBack={handleBack} />
      ) : (
        <div>
          {forumPosts.map((post: ForumPost, _: number) => (
            <div key={_} className="post-summary" onClick={() => handlePostClick(post)}>
              <h3>{post.title}</h3>
              <p className="author">by {post.author.username}</p>
              <p className="preview">{post.content.substring(0, 100)}...</p>
              <span className="comment-count">
                {post.comments.length} comments
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export function handlePostStaging(
  post: ForumPost,
  gameStage: number,
  setGameStage: any
) {
  if (post.title === "Mirai Code OFFICIALLY RELEASED" && gameStage === 9) {
    setGameStage(10);
  }
}
export default HackerForum;
