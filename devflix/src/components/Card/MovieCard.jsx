// src/components/MovieCard.js
import React from 'react';
import { IMG_URL } from '../../config.jsx';  // Ensure the path is correct based on your project structure

const MovieCard = ({ movie }) => (
  <div className="card">
    <img src={`${IMG_URL}${movie.poster_path}`} alt={movie.original_title} />
    <div className="card-content">
      <h3>{movie.original_title}</h3>
      <p>{movie.release_date}</p>
      <p>{movie.overview || "No overview available."}</p>
    </div>
  </div>
);

export default MovieCard;
