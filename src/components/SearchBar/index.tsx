import React from "react";

interface Props {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ searchQuery, setSearchQuery }) => {
    return (
        <input
            type="text"
            placeholder="Search posts by title..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
        />
    );
};

export default SearchBar;