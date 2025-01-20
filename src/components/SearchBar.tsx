import React from 'react';
import { FaSearch } from 'react-icons/fa';
import '../styles/SearchBar.css';

interface SearchBarProps {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for books..."
        onChange={onSearchChange}
      />
      <FaSearch className="search-icon" />
    </div>
  );
};

export default SearchBar;
