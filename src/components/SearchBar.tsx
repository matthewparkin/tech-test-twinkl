import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search posts by title..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
    />
  );
};

export default SearchBar;