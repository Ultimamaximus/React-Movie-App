import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovies } from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './MovieInfoCard.css';

const MovieInfoCard = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await fetchMovies(`/movie/${id}`);
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="movie-info-card">
      <div className="movie-info-title">{movie.title}</div>
      <div className="movie-info-body">
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`${movie.title} poster`} className="movie-info-poster" />
        <div className="movie-info-details">
          <div className="movie-info-summary">{movie.overview}</div>
        </div>
      </div>
      <div className="movie-info-extra">
        <div>Genre: {movie.genres.map(genre => genre.name).join(', ')}</div>
        <div>Release Date: {movie.release_date}</div>
        <div>Duration: {movie.runtime} minutes</div>
      </div>
      <div className="movie-info-rating">
        <FontAwesomeIcon icon={faStar} />
        <span className="rating-number">{movie.vote_average.toFixed(1)}</span>
      </div>
    </div>
  );
};

export default MovieInfoCard;