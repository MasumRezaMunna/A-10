import { Link } from "react-router-dom";
import { FaStar, FaRegCalendarAlt } from "react-icons/fa";

const MovieCard = ({ movie }) => {
  const { _id, title, posterUrl, genre, releaseYear, rating } = movie;

  return (
    <div className="card w-full h-full bg-base-100 shadow-xl image-full group">
      <figure className="h-64">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover transition duration-300 ease-in-out group-hover:scale-105"
        />
      </figure>

      <div className="card-body p-4 bg-black bg-opacity-50 transition duration-300 ease-in-out hover:bg-opacity-75">
        <h2 className="card-title text-white text-2xl font-bold">{title}</h2>
        <p className="text-sm text-gray-300 flex items-center mb-2">
          <FaRegCalendarAlt className="mr-2" /> Released: {releaseYear} | Genre:
          **{genre}**
        </p>

        <div className="flex items-center text-lg text-amber-400">
          <FaStar className="mr-1" />
          <span className="font-semibold">{rating}</span> / 10
        </div>

        <div className="card-actions justify-end mt-auto pt-2">
          <Link to={`/movies/${_id}`} className="btn btn-primary btn-sm">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
