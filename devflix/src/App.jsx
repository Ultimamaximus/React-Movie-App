// src/App.js
import React, { useState } from 'react';
import Header from './components/Header/Header';
import MovieList from './components/MovieList/MovieList';
import useMovieData from './hooks/useMovieData';

function App() {
    const [endpoint, setEndpoint] = useState('/discover/movie?sort_by=popularity.desc');
    const { data: movies, isLoading, error } = useMovieData(endpoint);

    const handleSearch = (searchTerm) => {
        setEndpoint(`/search/movie?query=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <div>
            <Header onSearchSubmit={handleSearch} />  
            <MovieList movies={movies} isLoading={isLoading} error={error} />
        </div>
    );
}

export default App;

