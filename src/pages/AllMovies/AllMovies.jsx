import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../../components/MovieCard/MovieCard";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { FaFilter } from "react-icons/fa";

const API_BASE_URL = "https://heroic-chimera-b7d46.netlify.app/";

const allGenres = [
  "Sci-Fi",
  "Drama",
  "Crime",
  "Action",
  "Comedy",
  "Thriller",
  "Horror",
  "Romance",
  "Animation",
];

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [ratingMin, setRatingMin] = useState(0);
  const [ratingMax, setRatingMax] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMovies = () => {
    setLoading(true);

    const params = new URLSearchParams();
    if (selectedGenres.length > 0) {
      params.append("genres", selectedGenres.join(","));
    }
    if (ratingMin > 0) {
      params.append("ratingMin", ratingMin);
    }
    if (ratingMax < 10) {
      params.append("ratingMax", ratingMax);
    }
    if (searchTerm) {
      params.append("title", searchTerm);
    }

    axios
      .get(`${API_BASE_URL}/movies?${params.toString()}`)
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Handle genre toggle
  const handleGenreToggle = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  return (
    <div className="p-6">
      <h1 className="text-5xl font-extrabold text-center my-8">
        Explore All Movies
      </h1>

      <form
        onSubmit={handleFilterSubmit}
        className="p-6 bg-base-200 rounded-lg mb-10 shadow-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Search by Title</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Inception"
              className="input input-bordered"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text font-semibold">
                Rating Range ({ratingMin} - {ratingMax})
              </span>
            </label>
            <div className="flex gap-4">
              <span className="label-text">Min: {ratingMin}</span>
              <input
                type="range"
                min={0}
                max={10}
                step="0.5"
                value={ratingMin}
                onChange={(e) => setRatingMin(parseFloat(e.target.value))}
                className="range range-primary"
              />
              <span className="label-text">Max: {ratingMax}</span>
              <input
                type="range"
                min={0}
                max={10}
                step="0.5"
                value={ratingMax}
                onChange={(e) => setRatingMax(parseFloat(e.target.value))}
                className="range range-secondary"
              />
            </div>
          </div>
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text font-semibold">Filter by Genre</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {allGenres.map((genre) => (
              <button
                type="button"
                key={genre}
                onClick={() => handleGenreToggle(genre)}
                className={`btn btn-sm ${
                  selectedGenres.includes(genre) ? "btn-primary" : "btn-outline"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <button type="submit" className="btn btn-primary btn-wide">
            <FaFilter className="mr-2" /> Apply Filters
          </button>
        </div>
      </form>

      {loading ? (
        <LoadingSpinner />
      ) : movies.length > 0 ? (
        <>
          <p className="text-center text-lg mb-10">
            Showing **{movies.length}** results.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">
            No movies match your filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllMovies;
