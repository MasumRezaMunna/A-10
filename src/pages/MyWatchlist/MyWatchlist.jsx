import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import MovieCard from '../../components/MovieCard/MovieCard';
import toast from 'react-hot-toast';

const API_BASE_URL = "http://localhost:5000";

const MyWatchlist = () => {
  const { user } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axios.get(`${API_BASE_URL}/watchlist/${user.email}`)
        .then(res => {
          setWatchlist(res.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching watchlist:", error);
          toast.error("Failed to load your watchlist.");
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6">
      <h1 className="text-5xl font-extrabold text-center my-8">My Watchlist</h1>
      <p className="text-center text-lg mb-10">
        You have **{watchlist.length}** {watchlist.length === 1 ? 'movie' : 'movies'} saved.
      </p>

      {watchlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {watchlist.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">Your watchlist is empty.</p>
        </div>
      )}
    </div>
  );
};

export default MyWatchlist;