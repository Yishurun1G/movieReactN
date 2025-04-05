import { useParams } from "react-router-dom"; // Hook to get dynamic URL parameters (e.g., movie id)
import { useState, useEffect } from "react"; // Hooks for managing state and side effects
import { getMovieDetail } from "../Services/api"; // Function to fetch movie details from an API
import { useMovieContext } from "../contexts/MovieContext"; // Custom context to manage favorites

const MovieDetail = () => {
  const { id } = useParams(); // Extract the movie ID from the URL
  const [movie, setMovie] = useState(null); // State to hold movie details
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext(); // Context functions for managing favorites

  // useEffect hook to fetch movie details when the component is mounted or the movie ID changes
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true); // Set loading state to true before fetching data
        const movieDetail = await getMovieDetail(id); // Fetch movie details from the API
        setMovie(movieDetail); // Store the fetched movie details in state
      } catch (error) {
        setError(error.message); // Set the error message if fetching fails
        console.error("Error fetching movie details:", error); // Log error for debugging
      } finally {
        setLoading(false); // Set loading state to false once the request is complete
      }
    };
    
    fetchMovieDetail(); // Call the function to fetch movie details
  }, [id]); // Dependency array ensures the effect is run when the movie ID changes

  // Function to handle adding/removing movie from favorites
  const handleFavoriteClick = () => {
    if (isFavorite(movie.id)) { // Check if the movie is already a favorite
      removeFromFavorites(movie.id); // If yes, remove from favorites
    } else {
      addToFavorites(movie); // Otherwise, add to favorites
    }
  };

  // Show a loading spinner while the movie data is being fetched
  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  // Show error message if there is an issue fetching movie data
  if (error) return (
    <div className="flex justify-center items-center h-screen text-red-500 text-xl">
      Error: {error}
    </div>
  );

  // Show message if the movie is not found (movie data is null)
  if (!movie) return (
    <div className="flex justify-center items-center h-screen text-white text-xl">
      Movie not found
    </div>
  );

  // Render the movie details once they have been successfully fetched
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Backdrop Section: Displays the movie's background image */}
      <div className="relative h-96 w-full overflow-hidden">
        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} // Movie backdrop image
            alt={movie.title} // Alt text for accessibility
            className="w-full h-full object-cover opacity-50" // Apply styling for backdrop
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div> {/* Gradient overlay */}
      </div>

      {/* Content Section: Displays the movie's details */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster Section: Displays the movie's poster */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Movie poster image
              alt={movie.title} // Alt text for accessibility
              className="w-full rounded-lg shadow-xl border-4 border-white" // Apply styling to poster
            />
          </div>

          {/* Details Section: Displays detailed information about the movie */}
          <div className="w-full md:w-2/3 lg:w-3/4 bg-gray-800/70 backdrop-blur-sm p-8 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {movie.title}
                  <span className="text-gray-400 ml-2">
                    ({new Date(movie.release_date).getFullYear()}) {/* Display movie release year */}
                  </span>
                </h1>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {/* Display movie rating, runtime, and genres */}
                  <span className="flex items-center bg-yellow-500/20 px-3 py-1 rounded-full text-yellow-400">
                    ⭐ {movie.vote_average.toFixed(1)} {/* Display average rating */}
                  </span>
                  <span className="bg-blue-500/20 px-3 py-1 rounded-full text-blue-400">
                    {movie.runtime} min {/* Display movie runtime */}
                  </span>
                  {movie.genres?.map(genre => (
                    <span key={genre.id} className="bg-purple-500/20 px-3 py-1 rounded-full text-purple-400">
                      {genre.name} {/* Display movie genres */}
                    </span>
                  ))}
                </div>
              </div>

              {/* Button to add/remove movie from favorites */}
              <button
                onClick={handleFavoriteClick} // Call the function when clicked
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  isFavorite(movie.id)
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-white"
                }`}
              >
                {isFavorite(movie.id) ? "❤️ Remove Favorite" : "♡ Add Favorite"} {/* Button text changes based on favorite status */}
              </button>
            </div>

            {/* Overview Section: Displays the movie's overview */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </div>

            {/* Movie Details Section: Displays additional information about the movie */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Details</h3>
                <ul className="space-y-2">
                  {/* Display various movie details like release date, language, budget, and revenue */}
                  <li>
                    <span className="text-gray-400">Release Date:</span>{" "}
                    <span className="text-white">{movie.release_date}</span>
                  </li>
                  <li>
                    <span className="text-gray-400">Original Language:</span>{" "}
                    <span className="text-white">{movie.original_language}</span>
                  </li>
                  {movie.budget > 0 && (
                    <li>
                      <span className="text-gray-400">Budget:</span>{" "}
                      <span className="text-white">${movie.budget.toLocaleString()}</span>
                    </li>
                  )}
                  {movie.revenue > 0 && (
                    <li>
                      <span className="text-gray-400">Revenue:</span>{" "}
                      <span className="text-white">${movie.revenue.toLocaleString()}</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Production Section: Displays the production companies */}
              <div>
                <h3 className="text-xl font-semibold mb-3">Production</h3>
                {movie.production_companies?.length > 0 && (
                  <div>
                    <h4 className="text-gray-400 mb-2">Companies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {movie.production_companies.map(company => (
                        <span key={company.id} className="bg-gray-700/50 px-3 py-1 rounded-full">
                          {company.name} {/* Display production companies */}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
