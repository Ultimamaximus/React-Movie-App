import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchForm.css';

function SearchForm({ onSearchSubmit }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim()) {
            onSearchSubmit(searchTerm);
        }
        setSearchTerm(''); // Optionally clear the search field after submitting
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="search-input"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search for movies"
            />
            <button type="submit" className="search-button">
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </form>
    );
}

export default SearchForm;
