import React from "react";
import "./ProTraf.css";

const ProTraf: React.FC = () => {
  return (
    <div className="protraf-container">
      <div className="header">
        <div className="logo">
          <div>
            <div className="company-name">ProTraf Solutions, LLC</div>
            <div className="tagline">
              Computer & Network Security · 15 followers
            </div>
          </div>
        </div>
        <div className="buttons">
          <button className="follow-btn">Follow</button>
          <button className="jobs-btn">See jobs</button>
        </div>
      </div>

      <div className="section">
        <h3>About us</h3>
        <p>
          ProTraf Solutions protects enterprise networks against DDoS attacks.
          By developing our DDoS mitigation panel totally in-house, we leverage
          a fast response-release cycle to stay ahead of the latest DDoS attacks
          and the competition.
        </p>
        <p>
          From hosting companies to VPNs to residential ISPs, ProTraf Solutions
          protects them all. Learn more about how you can leverage ProTraf
          Solution’s remote and on-premise mitigation solutions to keep your
          network online even in the face of the most complex DDoS attacks.
        </p>
      </div>

      <div className="section company-details">
        <h3>Company details</h3>
        <ul>
          <li>
            <strong>Cofounders:</strong>
            <ul>
              <li>
                Paras Jha:{" "}
                <a href="">paras.jha@protraf.com</a>
              </li>
              <li>
                Josiah White:{" "}
                <a href="">
                  josiah.white@protraf.com
                </a>
              </li>
            </ul>
          </li>
          <li>
            <strong>Year founded:</strong> 2015
          </li>
          <li>
            <strong>Company type:</strong> Privately Held
          </li>
        </ul>
      </div>
    </div>
  );
};
export default ProTraf;
