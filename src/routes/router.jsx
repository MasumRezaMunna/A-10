import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllMovies from "../pages/AllMovies/AllMovies";
import MyCollection from "../pages/MyCollection/MyCollection";
import AddMovie from "../pages/AddMovie/AddMovie";
import MyWatchlist from "../pages/MyWatchlist/MyWatchlist";
import PrivateRoute from "./PrivateRoute"; 
import MovieDetails from "../pages/MovieDetails/MovieDetails";
import UpdateMovie from "../pages/UpdateMovie/UpdateMovie";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import UserProfile from "../pages/UserProfile/UserProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <AllMovies />,
      },
      {
        path: "/movies/add",
        element: <PrivateRoute><AddMovie /></PrivateRoute>, 
      },
      {
        path: "/movies/my-collection",
        element: <PrivateRoute><MyCollection /></PrivateRoute>, 
      },
      {
        path: "/movies/:id",
        element: <MovieDetails />,
      },
      {
        path: "/movies/update/:id",
        element: <PrivateRoute><UpdateMovie /></PrivateRoute>,
      },
      {
        path: "/my-watchlist",
        element: <PrivateRoute><MyWatchlist /></PrivateRoute>,
      },
      {
        path: "/user-profile",
        element: <PrivateRoute><UserProfile></UserProfile></PrivateRoute>
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);