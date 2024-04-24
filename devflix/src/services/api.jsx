// src/services/api.js
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (endpoint) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `${BASE_URL}${endpoint}&api_key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return await response.json();
};
