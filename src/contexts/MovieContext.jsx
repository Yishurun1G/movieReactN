// Import necessary React hooks
import { createContext, useState, useContext, useEffect } from "react";

// Create a MovieContext to share state across components
const MovieContext = createContext();

// Custom hook to easily access MovieContext
export const useMovieContext = () => useContext(MovieContext);

// MovieProvider component that wraps around other components to provide context values
export const MovieProvider = ({ children }) => {
  // State to hold favorite movies
  const [favorites, setFavorites] = useState([]);
  // State to track whether initial loading of favorites from localStorage is complete
  const [isLoaded, setIsLoaded] = useState(false);

  // useEffect hook to load favorites from localStorage on initial render
  useEffect(() => {
    try {
      // Attempt to get the favorites from localStorage
      const storedFavs = localStorage.getItem("favorites");
      if (storedFavs) {
        // If favorites are found, parse and set them to the state
        setFavorites(JSON.parse(storedFavs));
      }
    } catch (error) {
      // If there's an error, log it (e.g., in case of corrupted localStorage data)
      console.error("Failed to parse favorites from localStorage", error);
    } finally {
      // Mark that the initial loading is complete
      setIsLoaded(true);
    }
  }, []); // Empty dependency array ensures this runs only once on initial render

  // useEffect hook to save the favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) { // Ensure saving happens only after the initial load
      try {
        // Save the favorites array to localStorage
        localStorage.setItem("favorites", JSON.stringify(favorites));
      } catch (error) {
        // Log any errors while saving to localStorage
        console.error("Failed to save favorites to localStorage", error);
      }
    }
  }, [favorites, isLoaded]); // Trigger saving when 'favorites' or 'isLoaded' changes

  // Function to add a movie to the favorites list
  const addToFavorites = (movie) => {
    // Check if the movie is already in the favorites list to prevent duplicates
    if (!favorites.some((fav) => fav.id === movie.id)) {
      // Add the movie to the state if it's not already in the favorites
      setFavorites((prev) => [...prev, movie]);
    }
  };

  // Function to remove a movie from the favorites list by movie ID
  const removeFromFavorites = (movieId) => {
    // Filter out the movie by ID
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  // Function to check if a movie is in the favorites list by movie ID
  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId); // Return true if movie ID is found in favorites
  };

  // Value to be provided by the context, which includes favorites and methods for managing them
  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  // Return the MovieContext.Provider with the value, wrapping around children components
  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
