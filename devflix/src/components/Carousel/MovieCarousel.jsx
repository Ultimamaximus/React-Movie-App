import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './MovieCarousel.css';

const MovieCarousel = ({ movies }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -1270 : 1270;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    const carousel = scrollRef.current;
    carousel.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check

    return () => {
      carousel.removeEventListener('scroll', checkScroll);
    };
  }, [movies]);

  return (
    <div className="carousel-container">
      {canScrollLeft && (
        <button className="carousel-arrow left-arrow" onClick={() => scroll('left')}>
          <i className="fas fa-chevron-left"></i>
        </button>
      )}
      <div className="movie-carousel" ref={scrollRef}>
        {movies.map(movie => (
          <div key={movie.id} className="carousel-item">
            <Link to={`/movie/${movie.id}`}>
              <img 
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} 
                alt={movie.title} 
                className="carousel-item-poster" 
              />
            </Link>
          </div>
        ))}
      </div>
      {canScrollRight && (
        <button className="carousel-arrow right-arrow" onClick={() => scroll('right')}>
          <i className="fas fa-chevron-right"></i>
        </button>
      )}
    </div>
  );
};

export default MovieCarousel;
