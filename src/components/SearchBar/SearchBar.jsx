import React, { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      onSearch(searchTerm);
    }
  };

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <label htmlFor="searchInput" className={styles.visuallyHidden}>
        Search news
      </label>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          id="searchInput"
          className={styles.searchInput}
          placeholder="Search news..."
          aria-label="Search news"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
