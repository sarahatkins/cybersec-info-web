import React from "react";
import "./GameEnd.css";

interface GameEndWidgetProps {
  message?: string;
  onRestart?: () => void;
}

const GameEndWidget: React.FC<GameEndWidgetProps> = ({
  onRestart,
}) => {
  return (
    <div className="game-end-overlay">
      <div className="game-end-box">
        <h1>Game Over</h1>
        <p>
          You have completed the game and discovered who created the Mirai bot!
          <br />
          Hopefully, you learned a bit about DDoS and what Mirai was :)
        </p>
        <p></p>
        <p>
          This was based on this article:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.wired.com/story/mirai-untold-story-three-young-hackers-web-killing-monster/"
          >
            The Mirai Confessions
          </a>
        </p>
        {/* {onRestart && ( */}
        <button className="restart-btn" onClick={onRestart}>
          Restart
        </button>
        {/* )} */}
      </div>
    </div>
  );
};

export default GameEndWidget;
