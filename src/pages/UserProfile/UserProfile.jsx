import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { FaUserCircle, FaSave } from "react-icons/fa";

const UserProfile = () => {
  const { user, loading, setLoading } = useContext(AuthContext);

  const [name, setName] = useState(user?.displayName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoURL || "");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    setIsUpdating(true);
    setLoading(true);

    updateProfile(user, {
      displayName: name,
      photoURL: photoUrl,
    })
      .then(() => {
        toast.success("Profile updated successfully! Refreshing data...");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile: " + error.message);
      })
      .finally(() => {
        setIsUpdating(false);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 flex items-center justify-center text-gray-900 dark:text-white">
          <FaUserCircle className="mr-3 text-4xl text-primary" />
          Update Your Profile
        </h1>

        <div className="flex justify-center mb-6">
          <img
            src={user?.photoURL || "https://i.ibb.co/3s3v1s6/forrest-gump.jpg"}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg"
          />
        </div>

        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email (Cannot be changed)
            </label>
            <input
              type="email"
              value={user?.email || ""}
              className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
              disabled
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="photoUrl"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Photo URL
            </label>
            <input
              id="photoUrl"
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>Updating...</>
            ) : (
              <>
                <FaSave className="mr-2" />
                Save Changes
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
