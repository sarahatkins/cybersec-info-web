import React, { useState } from "react";
import "./Home.css";
import type { WebsiteProps } from "../Window";

interface HomeSiteProps {
  urls?: WebsiteProps[];
}
const HomeSite: React.FC<HomeSiteProps> = ({ urls }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for: ${query}`);
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
