import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../../components/MovieCard/MovieCard";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const API_BASE_URL = "https://a-10-server-qhdn.vercel.app/";

const HeroSection = ({ movies }) => (
  <div
    className="hero min-h-[60vh]"
    style={{
      backgroundImage: `url(${
        movies[0]?.posterUrl || "https://i.ibb.co/8D1fWHZp/2019movies-900x789.jpg"
      })`,
    }}
  >
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-center text-neutral-content">
      <div className="max-w-md">
        <h1 className="mb-5 text-5xl font-bold">MovieMaster Pro</h1>
        <p className="mb-5">
          A comprehensive movie management system where users can browse,
          manage, and organize their favorite movies with advanced filtering and
          personal collections.
        </p>
        <button className="btn btn-primary">Get Started</button>
      </div>
    </div>
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-4xl font-bold text-center mt-12 mb-8 border-b-2 pb-2 inline-block border-primary mx-auto">
    {children}
  </h2>
);

const Home = () => {
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

  const topRatedMovies = [...movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);
  const recentlyAddedMovies = [...movies]
    .sort((a, b) => new Date(b.releaseYear) - new Date(a.releaseYear))
    .slice(0, 6);

  return (
    <div>
      {/* 1. Hero Section */}
      <HeroSection movies={movies} />

      <div className="px-4">
        {/* 2. Top Rated Movies */}
        <SectionTitle>🏆 Top Rated Movies</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {topRatedMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>

        {/* 3. Recently Added Movies */}
        <SectionTitle>✨ Recently Added</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentlyAddedMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>

        {/* 4. Genre Section (Static) */}
        <SectionTitle>🍿 Explore Genres</SectionTitle>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            "Action",
            "Drama",
            "Comedy",
            "Sci-Fi",
            "Horror",
            "Thriller",
            "Romance",
          ].map((genre) => (
            <button
              key={genre}
              className="btn btn-outline btn-info hover:scale-105 transition"
            >
              {genre}
            </button>
          ))}
        </div>

        {/* 5. About Platform (Static) */}
        <SectionTitle>🎬 About MovieMaster Pro</SectionTitle>
        <div className="my-12 p-8 bg-base-200 rounded-lg shadow-inner">
          <p className="text-lg mb-4">
            MovieMaster Pro is your ultimate hub for cinematic organization. We
            offer a robust platform to browse, discover, and manage your film
            library. Our advanced filtering and personalized collection features
            ensure you always find the perfect movie for any occasion.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              **Personalized Collections:** Build and share custom lists of your
              favorite films.
            </li>
            <li>
              **Advanced Filtering:** Search by genre, rating range, year, and
              more.
            </li>
            <li>**Community Ratings:** See what other cinephiles think.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
