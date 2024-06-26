import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from './components/Header/Header';
import MovieList from './components/MovieList/MovieList';
import MovieInfoCard from './components/Info/MovieInfoCard';
import useMovieData from './hooks/useMovieData';
import { debounce } from 'lodash'; 
import './styles/Global.css';

function App() {
    const [endpoint, setEndpoint] = useState('/discover/movie?sort_by=popularity.desc');
    const [page, setPage] = useState(1);
    const { data: movies, isLoading, error, hasMore } = useMovieData(endpoint, page);

    const lastScrollTop = useRef(0); // To hold the position before the latest data fetch
    const navigate = useNavigate();

    const handleSearch = (searchTerm) => {
        setPage(1);
        setEndpoint(`/search/movie?query=${encodeURIComponent(searchTerm)}`);
        navigate('/');
    };

    useEffect(() => {
        const handleScroll = debounce(() => {
            if (!isLoading && hasMore && (window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 1000)) {
                lastScrollTop.current = window.scrollY;
                setPage(prevPage => prevPage + 1);
            }
        }, 200);
    
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            handleScroll.cancel();
        };
    }, [isLoading, hasMore]);  // Ensure handleScroll reacts to isLoading and hasMore changes

    useEffect(() => {
        if (!isLoading) {
            // Restore the scroll position after data is fetched and the component is updated
            window.scrollTo(0, lastScrollTop.current);
        }
    }, [isLoading]); // Removed movies from the dependency array to focus on isLoading

    return (
        <div>
            <Header onSearchSubmit={handleSearch} />
            <Routes>
                <Route path="/" element={<MovieList movies={movies} isLoading={isLoading} error={error} />} />
                <Route path="/movie/:id" element={<MovieInfoCard />} />
            </Routes>
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;
