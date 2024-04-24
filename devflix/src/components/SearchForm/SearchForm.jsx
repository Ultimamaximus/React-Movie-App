// src/components/SearchForm/SearchForm.jsx
import React, { useState } from 'react';

function SearchForm({ onSearchSubmit }) { // Changed from onSearch to onSearchSubmit
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim()) {
            onSearchSubmit(searchTerm); // Ensure this matches the prop name passed in
        }
        setSearchTerm(''); // Optionally clear the search field after submitting
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search for movies"
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchForm;



