// api.js - Contains functions to interact with the Movie Database API.

const API_KEY = "2a29d3d3c3a4259249962820059266fb"; // Store API key to access the Movie Database API
const BASE_URL = 'https://api.themoviedb.org/3'; // Base URL of the Movie Database API

// Function to fetch popular movies from the API
export const getPopularMovies = async () => {
  // Send a GET request to fetch popular movies from the API
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );
  // Parse the response to JSON format
  const data = await response.json();
  // Return the results array, which contains popular movie data
  return data.results;
};

// Function to search for movies based on a query string (e.g., movie title)
export const searchMovies = async (query) => {
  // Send a GET request to search for movies based on the query
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  // Parse the response to JSON format
  const data = await response.json();
  // Return the results array, which contains movie search results
  return data.results;
};

// Function to get detailed information about a specific movie using its ID
export const getMovieDetail = async (id) => {
  try {
    // Send a GET request to fetch the details of a movie by ID
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    // Parse the response to JSON format
    const data = await response.json();
    // Return the movie detail data
    return data;
  } catch (error) {
    // Log any errors that occur during the fetch request
    console.error("Error fetching movie details:", error);
  }
};
