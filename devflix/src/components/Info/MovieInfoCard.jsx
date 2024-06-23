import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovies } from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import MovieCarousel from '../Carousel/MovieCarousel';
import placeholderImage from '../../images/Placeholder.webp';
import './MovieInfoCard.css';

const MovieInfoCard = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await fetchMovies(`/movie/${id}`);
        setMovie(data);
      } catch (error) {
        setError('Error fetching movie details.');
      } finally {
        setLoading(false);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const result = await fetchMovies(`/movie/${id}/recommendations`);
        setRecommendations(result.results);
      } catch (error) {
        setError('Error fetching recommendations.');
      }
    };

    fetchMovieDetails();
    fetchRecommendations();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!movie) {
    return <div className="not-found">Movie not found</div>;
  }

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = placeholderImage;
  };

  return (
    <div className="movie-info-page">
      <div className="movie-info-card">
        <div className="movie-info-title">{movie.title}</div>
        <div className="movie-info-body">
        <img 
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
            alt={`${movie.title} poster`} 
            className="movie-info-poster"
            onError={handleImageError}
          />
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
      <div className="movie-info-recommendations">
        <h3>You May Also Like:</h3>
        <MovieCarousel movies={recommendations} />
      </div>
    </div>
  );
};

export default MovieInfoCard;
