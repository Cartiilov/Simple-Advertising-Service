import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import { Button } from '../Buttons/Button'

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSearch}>
    
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button buttonStyle='btn--outline2' type={undefined} onClick={undefined} buttonSize={undefined}>Search</Button>
    </form>
  );
}

export default SearchBar;