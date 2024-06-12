import React from 'react';
import { Link } from 'react-router-dom';
import { IMG_URL } from '../../config.jsx';  
import './MovieCard.css';
import { truncateText } from '../../utility/utils';
import placeholderImage from '../../images/Placeholder.webp';  

const MovieCard = ({ movie }) => (
  <div className="card">
    <Link to={`/movie/${movie.id}`} className="card-link">
      <div className="card-media">
        <img 
          src={`${IMG_URL}${movie.poster_path}`} 
          alt={movie.original_title} 
          onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}  // Fallback to placeholder image on error
          loading="lazy"
        />
      </div>
      <div className="card-content">
        <h3>{movie.original_title}</h3>
        <p>{movie.release_date}</p>
        <p>{truncateText(movie.overview || "No overview available.", 150)}</p>
      </div>
    </Link>
  </div>
);

export default MovieCard;
