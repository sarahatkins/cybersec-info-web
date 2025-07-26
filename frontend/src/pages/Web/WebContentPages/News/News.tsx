import React, { useState } from "react";
import "./News.css";
import { type NewsPostInterface, newsPosts } from "../../../../components/db";
import ArticleDetail from "./Article";

const NewsSite: React.FC = () => {
  const [showArticle, setShowArticle] = useState<boolean>(false);
  const [specificArticle, setSpecificArticle] = useState<NewsPostInterface>();

  const breakingNews = newsPosts.find((post) => post.breaking);
  const otherArticles = newsPosts.filter((post) => !post.breaking);

  const handleBack = () => {
    setShowArticle(false);
  }

  const handleArticleClick = (article: NewsPostInterface) => {
    setSpecificArticle(article);
    setShowArticle(true);
  }

  return showArticle && specificArticle ? <ArticleDetail article={specificArticle} onBack={handleBack} /> : (
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
          {breakingNews && (
            <article className="featured-article" onClick={() => handleArticleClick(breakingNews)}>
              <img
                src="https://via.placeholder.com/700x350"
                alt={breakingNews.title}
              />
              <h1>{breakingNews.title}</h1>
              <p>{breakingNews.summary}</p>
            </article>
          )}

          <section className="other-articles">
            {otherArticles.map((post) => (
              <article key={post.id} onClick={() => handleArticleClick(post)}>
                <h2>{post.title}</h2>
                <p>{post.summary}</p>
              </article>
            ))}
          </section>
        </main>

        <aside className="sidebar">
          <h3>Trending</h3>
          <ul>
            <li><a href="#">Election Results Announced</a></li>
            <li><a href="#">Stock Market Update</a></li>
            <li><a href="#">Weather Alert: Storm Incoming</a></li>
            <li><a href="#">Interview: Famous Aussie Actor</a></li>
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
