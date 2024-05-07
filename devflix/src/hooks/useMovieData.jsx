import { useState, useEffect } from 'react';

const useMovieData = (endpoint, page) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);  // Track if there are more movies to load

    useEffect(() => {
        let cancel = false; // Flag to prevent setting state after unmount

        const fetchData = async () => {
            if (!hasMore || cancel) return; // Don't fetch if no more data or if fetch has been cancelled
            setIsLoading(true);
            try {
                const result = await fetchMovies(`${endpoint}&page=${page}`);
                if (!cancel) {
                    setData(prevData => page > 1 ? [...prevData, ...result.results] : result.results);
                    setHasMore(result.results.length > 0);  // Update hasMore based on fetched results
                }
                setError(null);
            } catch (error) {
                if (!cancel) {
                    setError('Failed to fetch data: ' + error.message);
                    console.error(error);
                }
            } finally {
                if (!cancel) {
                    setIsLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            cancel = true; // Set cancel flag on cleanup to avoid setting state after unmount
        };
    }, [endpoint, page]); // Removed hasMore from dependencies as it's internally managed

    return { data, isLoading, error, hasMore };
};

export default useMovieData;

