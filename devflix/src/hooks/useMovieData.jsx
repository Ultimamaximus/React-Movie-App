// src/hooks/useMovieData.js
import { useState, useEffect } from 'react';
import { fetchMovies } from '../services/api';

const useMovieData = (endpoint) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const results = await fetchMovies(endpoint);
                setData(results.results);
                setError(null);
            } catch (error) {
                setError(error);
            }
            setIsLoading(false);
        };

        fetchData();
    }, [endpoint]);

    return { data, isLoading, error };
};

export default useMovieData;
