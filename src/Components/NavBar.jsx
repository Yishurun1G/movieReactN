import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { BiSearchAlt2 } from "react-icons/bi";
import { useMovieContext } from "../contexts/MovieContext";
import { FiMenu, FiX } from "react-icons/fi"; // Hamburger and close icons

function NavBar({ searchQuery, setSearchQuery, handleSearch }) {
  const { favorites } = useMovieContext(); // Accessing favorite movies from context
  const navigate = useNavigate(); // Hook for navigation
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for managing the hamburger menu visibility

  // Handle form submit for search functionality
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submit action
    if (searchQuery.trim() === "") {
      navigate("/"); // If the search query is empty, go to the homepage
    } else {
      handleSearch(searchQuery); // Perform the search and pass the query to the handler
      navigate("/search"); // Redirect to the search results page
    }
    setIsMenuOpen(false); // Close the mobile menu after form submission
  };

  // Toggle the visibility of the hamburger menu on mobile
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-black px-4 sm:px-6 py-3 sm:py-4 shadow-md sticky top-0 z-[4000] text-white">
      {/* Main Row: Logo, Search Bar, and Hamburger/Nav Links */}
      <div className="flex justify-between items-center w-full">
        {/* Logo Section */}
        <div className="text-xl sm:text-2xl font-bold flex-shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <span className="bg-red-600 px-2 sm:px-3 py-1 rounded-md">Movie</span>
            <span>Hub</span>
          </Link>
        </div>

        {/* Search Bar: Positioned between Logo and Hamburger Menu */}
        <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md mx-2 sm:mx-4">
          <form onSubmit={handleFormSubmit} className="w-full flex gap-2">
            <div className="relative flex-1">
              {/* Search Input Field */}
              <input
                name="search"
                id="search"
                autoComplete="off"
                autoFocus={true} // Automatically focus the input field when page loads
                type="text"
                placeholder="Search movies..."
                className="w-full p-2 sm:p-3 text-sm sm:text-base text-white rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 placeholder-gray-400"
                value={searchQuery} // Controlled input field
                onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on input change
              />
              {/* Search Icon Button */}
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <BiSearchAlt2 className="text-lg sm:text-xl" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Section: Hamburger Menu (Mobile) or Nav Links (Desktop) */}
        <div className="flex items-center">
          {/* Hamburger Menu Icon for Mobile */}
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={toggleMenu} // Toggle the mobile menu visibility
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />} {/* Change icon based on menu state */}
          </button>

          {/* Navigation Links (Hidden on Mobile, Visible on Desktop) */}
          <div
            className={`${
              isMenuOpen ? "flex" : "hidden" // Show menu if isMenuOpen is true
            } md:flex flex-col md:flex-row items-center absolute md:static top-16 md:top-0 left-0 md:left-auto w-full md:w-auto bg-black md:bg-transparent px-4 md:px-0 py-4 md:py-0 shadow-md md:shadow-none transition-all duration-300 ease-in-out z-50 md:z-auto`}
          >
            {/* Home Link */}
            <Link
              to="/"
              className="text-white px-3 sm:px-4 py-2 rounded-md transition hover:bg-white/10 flex items-center gap-2 text-sm sm:text-base"
              onClick={() => setIsMenuOpen(false)} // Close menu after navigating
            >
              <AiFillHome className="text-lg sm:text-xl" />
              <span>Home</span>
            </Link>
            {/* Favorites Link */}
            <Link
              to="/favorites"
              className="text-white px-3 sm:px-4 py-2 rounded-md transition hover:bg-white/10 flex items-center gap-2 text-sm sm:text-base relative"
              onClick={() => setIsMenuOpen(false)} // Close menu after navigating
            >
              <div className="relative">
                <FaHeart className="text-red-500 text-lg sm:text-xl" />
                {/* Display the number of favorites if any */}
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                    {favorites.length}
                  </span>
                )}
              </div>
              <span>Favorites</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
