import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchForm.css';

function SearchForm({ onSearchSubmit }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim()) {
            onSearchSubmit(searchTerm);
        }
        setSearchTerm('');
    };

    const handleIconClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <form className={`search-form ${isExpanded ? 'expanded' : ''}`} onSubmit={handleSubmit}>
            <label htmlFor="search-input" className="sr-only">Search for movies</label>
            <input
                type="text"
                id="search-input"
                className="search-input"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search for movies"
            />
            <button type="submit" className="search-button" aria-label="Search">
                <FontAwesomeIcon icon={faSearch} onClick={handleIconClick} />
            </button>
        </form>
    );
}

export default SearchForm;
