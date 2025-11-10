import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";

const Register = () => {
  const [passwordError, setPasswordError] = useState('');
  const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get('name');
    const email = form.get('email');
    const photo = form.get('photo');
    const password = form.get('password');

    setPasswordError(''); 

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      toast.error('Registration failed: Password too short.');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError('Password must contain at least one uppercase letter.');
      toast.error('Registration failed: Missing uppercase letter.');
      return;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError('Password must contain at least one lowercase letter.');
      toast.error('Registration failed: Missing lowercase letter.');
      return;
    }

    createUser(email, password)
      .then(result => {

        updateUserProfile(name, photo)
          .then(() => {
            console.log('User profile updated');
            toast.success('Registration successful!');
            navigate('/'); 
          })
          .catch(error => {
            console.error("Profile update error:", error);
            toast.error('Registration successful, but profile update failed.');
          });
      })
      .catch(error => {
        console.error("Registration error:", error);
        
        if (error.code === 'auth/email-already-in-use') {
          toast.error('Registration failed: Email is already in use.');
        } else {
          toast.error(`Registration failed: ${error.message}`);
        }
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        toast.success("Signed in with Google successfully!");
        navigate('/');
      })
      .catch(error => {
        console.error("Google sign-in error:", error);
        toast.error(`Google Sign-In failed: ${error.message}`);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
          <form onSubmit={handleRegister}>
            {/* Name */}
            <div className="form-control">
              <label className="label"><span className="label-text">Name</span></label>
              <input type="text" name="name" placeholder="" className="input input-bordered" required />
            </div>
            {/* Email */}
            <div className="form-control">
              <label className="label"><span className="label-text">Email</span></label>
              <input type="email" name="email" placeholder="" className="input input-bordered" required />
            </div>
            {/* Photo URL */}
            <div className="form-control">
              <label className="label"><span className="label-text">Photo URL</span></label>
              <input type="text" name="photo" placeholder="" className="input input-bordered" />
            </div>
            {/* Password */}
            <div className="form-control">
              <label className="label"><span className="label-text">Password</span></label>
              <input type="password" name="password" placeholder="" className="input input-bordered" required />
              {passwordError && <p className="text-error text-sm mt-2">{passwordError}</p>}
            </div>
            
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>

          <p className="text-center mt-4">
            Already have an account? <Link to="/login" className="text-primary font-bold link link-hover">Login</Link>
          </p>
          
          <div className="divider">OR</div>

          <div className="form-control">
            <button onClick={handleGoogleSignIn} className="btn btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.0001 4.25C14.0759 4.25 15.918 4.9657 17.3888 6.3094L20.1691 3.55C18.1746 1.63678 15.2017 0.5 12.0001 0.5C7.26622 0.5 3.19039 2.86877 1.29883 6.44438L4.85098 8.94883C5.74834 6.27315 8.63618 4.25 12.0001 4.25ZM22.0001 12.25C22.0001 11.4283 21.9213 10.6186 21.7645 9.82736H12.0001V14.2259H17.4727C17.2343 15.5492 16.3982 16.6997 15.2215 17.4939L18.8239 20.2783C20.9167 18.232 22.0001 15.352 22.0001 12.25Z"/></svg>
              Google Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;