// src/components/Header/Header.jsx
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import './Header.css';
import logo from '../../images/1.png'; // Ensure the correct path

function Header({ onSearchSubmit }) {
    return (
        <header className="search-block">
            <a href="/" className="logo-link">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo-image" />
                    <h1 className="site-title">DEVFLIX</h1>
                </div>
            </a>
            <SearchForm onSearchSubmit={onSearchSubmit} /> 
        </header>
    );
}

export default Header;
