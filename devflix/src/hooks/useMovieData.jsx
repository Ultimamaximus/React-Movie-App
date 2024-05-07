const useMovieData = (endpoint, page) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);  // Track if there are more movies to load

    useEffect(() => {
        const fetchData = async () => {
            if (!hasMore) return;  // Don't fetch if no more data
            setIsLoading(true);
            try {
                const result = await fetchMovies(`${endpoint}&page=${page}`);
                setData(prevData => page > 1 ? [...prevData, ...result.results] : result.results);
                setError(null);
                setHasMore(result.results.length > 0);  // Update hasMore based on fetched results
            } catch (error) {
                setError('Failed to fetch data: ' + error.message);
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [endpoint, page]);

    return { data, isLoading, error, hasMore };
};

