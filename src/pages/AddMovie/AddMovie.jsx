import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = "https://a-10-server-qhdn.vercel.app";

const AddMovie = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddMovie = (e) => {
    e.preventDefault();
    const form = e.target;

    const newMovie = {
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
      addedBy: user.email,
    };

    axios
      .post(`${API_BASE_URL}/movies`, newMovie)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Movie added successfully!");
          form.reset();
          navigate("/movies/my-collection");
        }
      })
      .catch((error) => {
        console.error("Error adding movie:", error);
        toast.error("Failed to add movie.");
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-base-200 rounded-lg shadow-xl my-10">
      <h2 className="text-4xl font-bold text-center mb-8">Add a New Movie</h2>
      <form onSubmit={handleAddMovie} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Movie Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g., Inception"
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
              placeholder="e.g., Sci-Fi"
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
              placeholder="e.g., 2010"
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
              placeholder="e.g., 8.8"
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
              placeholder="e.g., 148"
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
              placeholder="e.g., Christopher Nolan"
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
              placeholder="e.g., Leonardo DiCaprio, ..."
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
              placeholder="e.g., English"
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
              placeholder="e.g., USA"
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
            placeholder="https://..."
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
            placeholder="A thief who steals corporate secrets..."
          ></textarea>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Added By</span>
          </label>
          <input
            type="email"
            value={user?.email}
            className="input input-bordered"
            disabled
          />
        </div>

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary btn-lg">
            Add Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
