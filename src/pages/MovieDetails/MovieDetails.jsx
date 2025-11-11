import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { FaStar, FaRegCalendarAlt, FaClock } from "react-icons/fa";

const API_BASE_URL = "http://localhost:5000";

const MovieDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        toast.error("Failed to load movie details.");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    document.getElementById("delete_modal").showModal();
  };

  const confirmDelete = () => {
    axios
      .delete(`${API_BASE_URL}/movies/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          toast.success("Movie deleted successfully!");
          navigate("/movies");
        }
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
        toast.error("Failed to delete movie.");
      });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!movie) {
    return <div className="text-center text-2xl py-20">Movie not found.</div>;
  }

  const {
    title,
    posterUrl,
    plotSummary,
    genre,
    releaseYear,
    rating,
    duration,
    director,
    cast,
    language,
    country,
    addedBy,
  } = movie;
  const isOwner = user && user.email === addedBy;

  return (
    <div className="p-4 md:p-8">
      <div className="card lg:card-side bg-base-100 shadow-2xl max-w-6xl mx-auto my-10">
        <figure className="lg:w-1/3">
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body lg:w-2/3">
          <h1 className="card-title text-4xl font-extrabold">{title}</h1>
          <p className="text-lg text-gray-400">Directed by: **{director}**</p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 my-2 text-lg">
            <span className="flex items-center">
              <FaStar className="text-yellow-400 mr-2" /> {rating} / 10
            </span>
            <span className="flex items-center">
              <FaRegCalendarAlt className="text-blue-400 mr-2" /> {releaseYear}
            </span>
            <span className="flex items-center">
              <FaClock className="text-green-400 mr-2" /> {duration} mins
            </span>
            <span className="badge badge-info badge-lg">{genre}</span>
          </div>

          <h3 className="text-xl font-semibold mt-4">Plot Summary</h3>
          <p>{plotSummary}</p>

          <h3 className="text-xl font-semibold mt-4">Cast</h3>
          <p>{cast}</p>

          <div className="divider"></div>

          <div className="flex flex-wrap gap-4">
            <p>
              <strong>Language:</strong> {language}
            </p>
            <p>
              <strong>Country:</strong> {country}
            </p>
          </div>
          <p className="text-sm text-gray-500 mt-2">Added By: {addedBy}</p>

          {isOwner && (
            <div className="card-actions justify-end mt-6">
              <Link to={`/movies/update/${id}`} className="btn btn-warning">
                Edit
              </Link>
              <button onClick={handleDelete} className="btn btn-error">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Delete</h3>
          <p className="py-4">
            Are you sure you want to delete "{title}"? This action cannot be
            undone.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-outline mr-2">Cancel</button>
            </form>
            <button onClick={confirmDelete} className="btn btn-error">
              Confirm Delete
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MovieDetails;
