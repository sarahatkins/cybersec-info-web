import React from "react";
import "./NotFound.css";

const NotFound: React.FC = () => {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>The domain you are trying to reach doesn't exist.</p>
      <p>It might be offline or unreachable due to network failure.</p>
      <div className="glitch-box">
        <code>ERR_NAME_NOT_RESOLVED</code>
      </div>
    </div>
  );
};

export default NotFound;
