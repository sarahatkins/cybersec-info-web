import React, { useState } from 'react';
import './Home.css';

const HomeSite: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for: ${query}`);
  };

  return (
    <div className="google-home">
      <div className="logo-container">
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
          alt="Google"
          className="google-logo"
        />
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search Google or type a URL"
        />
        <div className="buttons">
          <button type="submit">Google Search</button>
          <button type="button" onClick={() => alert('I’m feeling lucky!')}>
            I'm Feeling Lucky
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomeSite;
