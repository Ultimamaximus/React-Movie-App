// src/components/Header/Header.jsx
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';

function Header({ onSearchSubmit }) {  // Ensure this prop is received from the parent (App component)
    return (
        <header className="search-block">
            <a href="/" className="logo-link">
                <h1>TheMovieDB</h1>
            </a>
            <SearchForm onSearchSubmit={onSearchSubmit} /> 
        </header>
    );
}

export default Header;
