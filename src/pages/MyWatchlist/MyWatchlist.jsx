import { useContext, useEffect, useState, useCallback } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import MovieCard from '../../components/MovieCard/MovieCard';
import toast from 'react-hot-toast';

const API_BASE_URL = "https://a-10-server-qhdn.vercel.app/"; 

const MyWatchlist = () => {
  const { user } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWatchlist = useCallback(() => {
    if (user?.email) {
      setLoading(true);
      axios.get(`${API_BASE_URL}/watchlist/${user.email}`)
        .then(res => {
          setWatchlist(res.data || []);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching watchlist:", error);
          toast.error("Failed to load your watchlist.");
          setLoading(false);
        });
    }
  }, [user]); 

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]); 
  
  const handleRemove = (movieId, movieTitle) => {
    const confirmed = window.confirm(`Are you sure you want to remove "${movieTitle}" from your watchlist?`);
    
    if (confirmed && user?.email) {
      // Calls the DELETE endpoint
      axios.delete(`${API_BASE_URL}/watchlist/${movieId}?email=${user.email}`)
        .then(res => {
          if (res.data.deletedCount > 0) {
            toast.success(`${movieTitle} removed from watchlist!`);
            
            setWatchlist(prevWatchlist => prevWatchlist.filter(movie => movie._id !== movieId));
          } else {
            toast.error('Could not find the movie to remove.');
          }
        })
        .catch(error => {
          console.error("Error removing from watchlist:", error);
          toast.error('Failed to remove from watchlist.');
        });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6">
      <h1 className="text-5xl font-extrabold text-center my-8">My Watchlist 🍿</h1>
      <p className="text-center text-lg mb-10">
        You have **{watchlist.length}** {watchlist.length === 1 ? 'movie' : 'movies'} saved.
      </p>

      {watchlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {watchlist.map(movie => (
            <MovieCard 
              key={movie._id} 
              movie={movie} 
              onRemove={handleRemove}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">Your watchlist is empty. Time to start saving!</p>
        </div>
      )}
    </div>
  );
};

export default MyWatchlist;