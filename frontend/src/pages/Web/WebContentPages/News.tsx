import React from "react";
import "./News.css";

const NewsSite: React.FC = () => {
  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">AUS News</div>
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">Politics</a>
          <a href="#">Business</a>
          <a href="#">Sport</a>
          <a href="#">Culture</a>
        </nav>
      </header>
      <div className="content-wrapper">
        <main className="main-news">
          <article className="featured-article">
            <img
              src="https://via.placeholder.com/700x350"
              alt="Featured news"
            />
            <h1>Breaking News: Major Event in Australia</h1>
            <p>
              This is a summary of the latest breaking news story happening in
              Australia today. Stay tuned for updates.
            </p>
          </article>
          <section className="other-articles">
            <article>
              <h2>Local News: City Council Updates</h2>
              <p>Details about the latest decisions by the city council.</p>
            </article>
            <article>
              <h2>Sports: Big Win for Local Team</h2>
              <p>Highlights from yesterday's thrilling game.</p>
            </article>
            <article>
              <h2>Culture: New Exhibition Opens</h2>
              <p>A new art exhibition has opened downtown.</p>
            </article>
          </section>
        </main>
        <aside className="sidebar">
          <h3>Trending</h3>
          <ul>
            <li>
              <a href="#">Election Results Announced</a>
            </li>
            <li>
              <a href="#">Stock Market Update</a>
            </li>
            <li>
              <a href="#">Weather Alert: Storm Incoming</a>
            </li>
            <li>
              <a href="#">Interview: Famous Aussie Actor</a>
            </li>
          </ul>
        </aside>
      </div>
      <footer className="footer">
        <p>© 2025 AUS News. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default NewsSite;
