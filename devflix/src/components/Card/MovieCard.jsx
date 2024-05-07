// src/components/MovieCard.js
import React from 'react';
import { IMG_URL } from '../../config.jsx';  
import './MovieCard.css';

const MovieCard = ({ movie }) => (
    <div className="card">
      <div className="card-media">
        <img src={`${IMG_URL}${movie.poster_path}`} alt={movie.original_title} />
      </div>
      <div className="card-content">
        <h3>{movie.original_title}</h3>
        <p>{movie.release_date}</p>
        <p>{movie.overview || "No overview available."}</p>
      </div>
    </div>
  );
  
  

export default MovieCard;
