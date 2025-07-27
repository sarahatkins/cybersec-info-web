import React from "react";
import { type NewsPostInterface } from "../../../../components/db";
import './Article.css'
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
        <div className="logo" >CYBER News</div>
        <nav className="nav">
          <button onClick={onBack}>Back</button>
        </nav>
      </header>

      <main className="article-detail">
        <h1>{article.title}</h1>
        <p className="summary">{article.summary}</p>
        <div className="content">
          {article.content ? (           
            <p dangerouslySetInnerHTML={{ __html: article.content }} />
          ) : (
            <p>[Full article content will appear here soon.]</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ArticleDetail;
