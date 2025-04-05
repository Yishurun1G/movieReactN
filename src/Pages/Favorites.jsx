import MovieCard from "../Components/MovieCard"; // Importing MovieCard component to display individual movie details
import { useMovieContext } from "../contexts/MovieContext"; // Importing context to access favorite movies
import { FaHeart, FaRegSadTear } from "react-icons/fa"; // Importing icons for UI elements

// Favorites component that displays a list of favorite movies
function Favorites() {
  // Using the MovieContext to get the list of favorite movies
  const { favorites } = useMovieContext();

  // Check if there are any favorite movies
  if (favorites.length > 0) {
    return (
      <div className="home bg-gradient-to-b from-[#1f1e1e] to-black text-white min-h-screen px-4 py-10">
        {/* Header section displaying the "Your Favorites" title */}
        <h2 className="mb-10 text-4xl text-white text-center drop-shadow-lg flex items-center justify-center gap-3">
          <FaHeart className="text-red-500 animate-pulse" /> {/* Heart icon with animation */}
          Your Favorites
        </h2>

        {/* Grid layout to display the list of favorite movies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center max-w-6xl mx-auto animate-fade-in">
          {/* Map through each favorite movie and render MovieCard component */}
          {favorites.map((movie) => (
            <div className="w-full max-w-xs transform transition duration-300 hover:scale-105" key={movie.id}>
              {/* Each MovieCard is passed a movie object */}
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // If there are no favorite movies, display a message
  return (
    <div className="text-center p-16 bg-white/5 rounded-2xl mx-auto my-16 max-w-3xl animate-fade-in">
      <div className="flex items-center justify-center gap-2 text-red-600 mb-4">
        <FaRegSadTear className="text-4xl animate-bounce" /> {/* Sad tear icon with animation */}
        <h2 className="text-3xl font-semibold">No Favorite Movies Yet</h2> {/* No favorite movies message */}
      </div>
      <p className="text-gray-400 text-lg leading-relaxed">
        Start adding movies to your favorites and they will appear here! {/* Instructions for the user */}
      </p>
    </div>
  );
}

export default Favorites;
