import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-primary">404</h1>
        <p className="text-3xl font-semibold md:text-4xl">Page Not Found</p>
        <p className="mt-4 mb-8 text-lg text-gray-500">
          Sorry, we couldn't find the page you're looking for.
        </p>
        
        {error && (
          <p className="text-gray-400 mb-8">
            <i>{error.statusText || error.message}</i>
          </p>
        )}
        
        <Link 
          to="/" 
          className="btn btn-primary btn-lg"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;