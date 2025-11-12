import { useContext, useEffect, useState }from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const API_BASE_URL = "https://a-10-server-qhdn.vercel.app/";

const MyCollection = () => {
  const { user } = useContext(AuthContext);
  const [myMovies, setMyMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyMovies = () => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/movies-by-email?email=${user.email}`)
      .then(res => {
        setMyMovies(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching user's movies:", error);
        toast.error("Failed to load your movies.");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user?.email) {
      fetchMyMovies();
    }
  }, [user]);

  const handleDelete = (id, title) => {

    const confirmed = window.confirm(`Are you sure you want to delete "${title}"?`);
    
    if (confirmed) {
      axios.delete(`${API_BASE_URL}/movies/${id}`)
        .then(res => {
          if (res.data.deletedCount > 0) {
            toast.success('Movie deleted successfully!');
            setMyMovies(prevMovies => prevMovies.filter(movie => movie._id !== id));
          }
        })
        .catch(error => {
          console.error("Error deleting movie:", error);
          toast.error('Failed to delete movie.');
        });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6">
      <h1 className="text-5xl font-extrabold text-center my-8">My Movie Collection</h1>
      <p className="text-center text-lg mb-10">
        You have added **{myMovies.length}** {myMovies.length === 1 ? 'movie' : 'movies'}.
      </p>

      {myMovies.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full shadow-lg">
            <thead className="bg-base-300 text-lg">
              <tr>
                <th>Poster</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myMovies.map(movie => (
                <tr key={movie._id} className="hover">
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={movie.posterUrl} alt={movie.title} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{movie.title}</div>
                    <div className="text-sm opacity-50">{movie.releaseYear}</div>
                  </td>
                  <td>{movie.genre}</td>
                  <td>{movie.rating} / 10</td>
                  <td className="flex gap-2">
                    <Link to={`/movies/update/${movie._id}`} className="btn btn-warning btn-sm btn-circle" aria-label="Edit">
                      <FaEdit />
                    </Link>
                    <button 
                      onClick={() => handleDelete(movie._id, movie.title)} 
                      className="btn btn-error btn-sm btn-circle" 
                      aria-label="Delete"
                    >
                      <FaTrash />
                    </button>
                    <Link to={`/movies/${movie._id}`} className="btn btn-info btn-sm">
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">You haven't added any movies yet.</p>
          <Link to="/movies/add" className="btn btn-primary mt-6">Add Your First Movie</Link>
        </div>
      )}
    </div>
  );
};

export default MyCollection;