// src/components/MovieList/MovieList.jsx
import React from 'react';
import MovieCard from '../Card/MovieCard';
import './MovieList.css'; 

function MovieList({ movies, error }) {
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div className="row">
            {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
    );
}

export default MovieList;


