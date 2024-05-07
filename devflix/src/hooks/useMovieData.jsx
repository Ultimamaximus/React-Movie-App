// src/hooks/useMovieData.jsx
import { useState, useEffect } from 'react';
import { fetchMovies } from '../services/api';

const useMovieData = (endpoint, page) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const result = await fetchMovies(`${endpoint}&page=${page}`);
                setData(prevData => page > 1 ? [...prevData, ...result.results] : result.results);
                setError(null);
            } catch (error) {
                setError('Failed to fetch data: ' + error.message);
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [endpoint, page]);

    return { data, isLoading, error };
};

export default useMovieData;
