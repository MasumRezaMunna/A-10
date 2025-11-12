import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; 

const MovieCard = ({ movie, onRemove }) => { 
  const { _id, title, posterUrl, genre, rating } = movie;

  return (
    <div className="card card-compact bg-base-100 shadow-xl image-full group">
      <figure>
        <img src={posterUrl} alt={title} className="w-full h-full object-cover" />
      </figure>
      
      <div className="card-body bg-black bg-opacity-50 transition duration-300 group-hover:bg-opacity-70">
        
        <h2 className="card-title text-white">{title}</h2>
        <p className="text-sm text-gray-300">Genre: **{genre}**</p>
        <p className="text-sm text-yellow-400">Rating: **{rating} / 10**</p>
        
        <div className="card-actions justify-end mt-4">
          
          {onRemove && (
            <button 
              onClick={() => onRemove(_id, title)} 
              className="btn btn-error btn-sm"
            >
              <FaTrash /> Remove
            </button>
          )}

          <Link to={`/movies/${_id}`} className="btn btn-primary btn-sm">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;