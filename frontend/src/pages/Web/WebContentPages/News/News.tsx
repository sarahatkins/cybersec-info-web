import React, { useEffect, useState } from "react";
import "./News.css";
import { type NewsPostInterface, newsPosts } from "../../../../components/db";
import ArticleDetail from "./Article";
import { useGame } from "../../../../context/GameContext";

const NewsSite: React.FC = () => {
  const {gameStage, setGameStage} = useGame();
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

  useEffect(() => {
    specificArticle && handleArticleStaging(specificArticle, gameStage, setGameStage);
  }, [specificArticle])

  return showArticle && specificArticle ? <ArticleDetail article={specificArticle} onBack={handleBack} /> : (
    <div className="app-container">
      <header className="header">
        <div className="logo">CYBER News</div>
      </header>
       <div className="content-wrapper">
        <main className="main-news">
          {breakingNews && (
            <article className="featured-article" onClick={() => handleArticleClick(breakingNews)}>
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
            <li><a href="#">CyberSecurity Trends</a></li>
            <li><a href="#">A New Threat on the Horizons</a></li>
            <li><a href="#">Weather Alert: DDoS Incoming</a></li>
            <li><a href="#">A Hackers Worst Nightmare</a></li>
          </ul>
        </aside>
      </div>

      <footer className="footer">
        <p>© 2025 AUS News. All rights reserved.</p>
      </footer>
    </div>
  );
};

export function handleArticleStaging(
  article: NewsPostInterface,
  gameStage: number,
  setGameStage: any
) {
  if (
    article.title === "Massive DDoS Attack Knocks Cyber Journalist Brian Krebs Offline" &&
    gameStage === 5
  ) {
    setGameStage(6);
  }
}

export default NewsSite;
