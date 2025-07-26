import React from "react";
import { type NewsPostInterface } from "../../../../components/db";

interface ArticleDetailProps {
  article: NewsPostInterface;
  onBack: any;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onBack }) => {
  if (!article) {
    return (
      <div className="article-detail">
        <p>Article not found.</p>
        <button onClick={onBack}>← Back to News</button>
      </div>
    );
  }

  return (
    <div className="article-detail-container">
      <header className="header">
        <div className="logo">AUS News</div>
        <nav className="nav">
          <button onClick={onBack}>← Back to News</button>
        </nav>
      </header>

      <main className="article-detail">
        <h1>{article.title}</h1>
        <p className="summary">{article.summary}</p>
        <div className="content">
          {article.content ? (
            <p>{article.content}</p>
          ) : (
            <p>[Full article content will appear here soon.]</p>
          )}
        </div>
      </main>

      <footer className="footer">
        <p>© 2025 AUS News. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ArticleDetail;
