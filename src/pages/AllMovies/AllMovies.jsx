import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../../components/MovieCard.jsx/MovieCard";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const API_BASE_URL = "http://localhost:5000";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/movies`)
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6">
      <h1 className="text-5xl font-extrabold text-center my-8">
        Explore All Movies
      </h1>
      <p className="text-center text-lg mb-10">
        Discover all {movies.length} titles in the MovieMaster Pro collection.
      </p>

      {movies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">
            No movies found in the database. Please check your server
            connection.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllMovies;
