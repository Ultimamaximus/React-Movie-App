// src/services/api.js
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (endpoint) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    // Ensure the URL is constructed correctly whether or not endpoint already includes query parameters.
    const url = `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
        const errMessage = await response.json().then(data => data.status_message || 'Unknown error occurred');
        throw new Error(`Failed to fetch data: ${errMessage}`);
    }

    return await response.json();
};