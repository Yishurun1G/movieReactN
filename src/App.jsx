import { Routes, Route } from "react-router-dom"; // Import routing components from react-router-dom
import { MovieProvider } from "./contexts/MovieContext"; // Import MovieProvider for context state management
import NavBar from "./Components/NavBar"; // Import NavBar component for navigation
import Home from "./Pages/Home"; // Import Home page component
import Favorites from "./Pages/Favorites"; // Import Favorites page component
import MovieDetailPage from "./Components/movie"; // Import MovieDetailPage component (appears unused)
import { useEffect, useState } from "react"; // Import React hooks for side effects and state
import MovieDetail from "./Components/movie"; // Import MovieDetail component (duplicate import, likely intended)
import { searchMovies } from "./Services/api"; // Import API function to search movies

function App() { // Main App component
  // State declarations using useState hook
  const [searchQuery, setSearchQuery] = useState(""); // Store the current search query string
  const [searchResults, setSearchResults] = useState([]); // Store the results of movie searches
  const [loading, setLoading] = useState(false); // Track loading state during API calls
  const [error, setError] = useState(null); // Store error messages if search fails

  // Effect to handle debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => { // Set a timeout for debouncing search input
      if (searchQuery.trim()) { // Check if search query is not empty after trimming whitespace
        handleSearch(); // Trigger search function
      }
    }, 500); // Delay of 500ms to prevent rapid API calls

    return () => clearTimeout(delayDebounceFn); // Cleanup timeout on unmount or query change
  }, [searchQuery]); // Runs when searchQuery changes

  const handleSearch = async () => { // Async function to perform movie search
    if (!searchQuery.trim()) return; // Exit if search query is empty after trimming
    setLoading(true); // Set loading state to true before API call
    try {
      const results = await searchMovies(searchQuery); // Fetch search results from API
      setSearchResults(results); // Update search results state
      setError(null); // Clear any previous errors
    } catch (err) { // Handle errors
      console.log(err); // Log error to console
      setError("Failed to search movies..."); // Set error message
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  const handleSubmit = (e) => { // Function to handle form submission
    e.preventDefault(); // Prevent default form submission behavior
    handleSearch(); // Trigger search immediately on submit
  };

  // JSX Render
  return (
    <MovieProvider> {/* Wrap app in MovieProvider for context access */}
      <NavBar // Render navigation bar
        searchQuery={searchQuery} // Pass current search query
        setSearchQuery={setSearchQuery} // Pass function to update search query
        handleSearch={handleSearch} // Pass handleSearch function directly
        setMovies={setSearchResults} // Pass setSearchResults as setMovies prop
      />
      <main className="main-content"> {/* Main content container */}
        <Routes> {/* Define routing structure */}
          <Route // Home route
            path="/" // Root path
            element={ // Render Home component
              <Home
                searchResults={searchResults} // Pass search results to Home
                setSearchResults={setSearchResults} // Pass function to update search results
                loading={loading} // Pass loading state
                error={error} // Pass error state (though not used in Home as per previous code)
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} /> {/* Favorites page route */}
          {/* New route for the movie detail page */}
          <Route path="/movie/:id" element={<MovieDetail />} /> {/* Movie detail route with dynamic ID */}
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App; // Export App component