import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || "/"; 

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(result => {
        console.log("Login success:", result.user);
        toast.success("Logged in successfully!");
        form.reset();
        navigate(from, { replace: true });
      })
      .catch(error => {
        console.error("Login error:", error);

        if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
             toast.error("Login failed: Invalid email or password.");
        } else {
             toast.error(`Login failed: ${error.message}`);
        }
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        toast.success("Signed in with Google successfully!");
        navigate(from, { replace: true });
      })
      .catch(error => {
        console.error("Google sign-in error:", error);
        toast.error(`Google Sign-In failed: ${error.message}`);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="form-control">
              <label className="label"><span className="label-text">Email</span></label>
              <input type="email" name="email" placeholder="" className="input input-bordered" required />
            </div>
            {/* Password */}
            <div className="form-control">
              <label className="label"><span className="label-text">Password</span></label>
              <input type="password" name="password" placeholder="" className="input input-bordered" required />

              <label className="label"><a href="#" className="label-text-alt link link-hover">Forgot password?</a></label>
            </div>
            
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>

          <p className="text-center mt-4">
            New to MovieMaster Pro? <Link to="/register" className="text-secondary font-bold link link-hover">Register</Link>
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

export default Login;