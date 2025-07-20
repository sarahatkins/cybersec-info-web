import React, { useState } from "react";
import "./Home.css";

type HomeSiteProps = {
  onSearchSubmit?: (url: string) => void;
};

const HomeSite: React.FC<HomeSiteProps> = ({ onSearchSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedUrl = query.startsWith("https://")
      ? query
      : `https://${query}`;

    // Call the passed-in function from Window component
    if (onSearchSubmit) {
      onSearchSubmit(formattedUrl);
    }
  };
  
  return (
    <div className="google-home">
      <div className="logo-container">Secret Search Engine</div>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search or type a URL"
        />
      </form>
    </div>
  );
};

export default HomeSite;
