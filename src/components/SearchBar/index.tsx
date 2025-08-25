import React from "react";
import "./index.scss";

interface Props {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="search-bar-container">
            <input
                id="search-bar"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
            />
        </div>
    );
};

export default SearchBar;