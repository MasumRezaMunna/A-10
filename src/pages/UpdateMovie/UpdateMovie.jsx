import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const API_BASE_URL = "https://a-10-server-qhdn.vercel.app/";

const UpdateMovie = () => {
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
        if (user.email !== res.data.addedBy) {
          toast.error("Access Denied: You are not the owner.");
          navigate("/");
        } else {
          setMovie(res.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching movie:", error);
        toast.error("Failed to load movie data.");
        setLoading(false);
      });
  }, [id, user, navigate]);

  const handleUpdateMovie = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedMovie = {
      title: form.title.value,
      genre: form.genre.value,
      releaseYear: parseInt(form.releaseYear.value),
      director: form.director.value,
      cast: form.cast.value,
      rating: parseFloat(form.rating.value),
      duration: parseInt(form.duration.value),
      plotSummary: form.plotSummary.value,
      posterUrl: form.posterUrl.value,
      language: form.language.value,
      country: form.country.value,
    };

    axios
      .put(`${API_BASE_URL}/movies/${id}`, updatedMovie)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Movie updated successfully!");
          navigate(`/movies/${id}`);
        } else {
          toast.error("No changes were made.");
        }
      })
      .catch((error) => {
        console.error("Error updating movie:", error);
        toast.error("Failed to update movie.");
      });
  };

  if (loading || !movie) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-base-200 rounded-lg shadow-xl my-10">
      <h2 className="text-4xl font-bold text-center mb-8">
        Update Movie: {movie.title}
      </h2>
      <form onSubmit={handleUpdateMovie} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Movie Title</span>
            </label>
            <input
              type="text"
              name="title"
              defaultValue={movie.title}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Genre</span>
            </label>
            <input
              type="text"
              name="genre"
              defaultValue={movie.genre}
              className="input input-bordered"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Release Year</span>
            </label>
            <input
              type="number"
              name="releaseYear"
              defaultValue={movie.releaseYear}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Rating (1-10)</span>
            </label>
            <input
              type="number"
              name="rating"
              step="0.1"
              min="0"
              max="10"
              defaultValue={movie.rating}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Duration (mins)</span>
            </label>
            <input
              type="number"
              name="duration"
              defaultValue={movie.duration}
              className="input input-bordered"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Director</span>
            </label>
            <input
              type="text"
              name="director"
              defaultValue={movie.director}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Cast (comma separated)</span>
            </label>
            <input
              type="text"
              name="cast"
              defaultValue={movie.cast}
              className="input input-bordered"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Language</span>
            </label>
            <input
              type="text"
              name="language"
              defaultValue={movie.language}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Country</span>
            </label>
            <input
              type="text"
              name="country"
              defaultValue={movie.country}
              className="input input-bordered"
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Poster URL</span>
          </label>
          <input
            type="url"
            name="posterUrl"
            defaultValue={movie.posterUrl}
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Plot Summary</span>
          </label>
          <textarea
            name="plotSummary"
            className="textarea textarea-bordered h-24"
            defaultValue={movie.plotSummary}
          ></textarea>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Added By (Not Editable)</span>
          </label>
          <input
            type="email"
            value={movie.addedBy}
            className="input input-bordered"
            disabled
          />
        </div>

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary btn-lg">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMovie;
