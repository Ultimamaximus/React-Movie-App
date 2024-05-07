// src/hooks/useFetch.jsx
import { useState, useEffect } from 'react';

function useFetch(fetchFunction, param) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const result = await fetchFunction(param);
                setData(result.results || []);
            } catch (error) {
                setError('Failed to fetch data');
                console.error(error);
            }
            setIsLoading(false);
        };

        fetchData();
    }, [fetchFunction, param]);

    return { data, isLoading, error };
}

export default useFetch;
