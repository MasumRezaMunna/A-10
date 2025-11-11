import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllMovies from "../pages/AllMovies/AllMovies";
import MyCollection from "../pages/MyCollection/MyCollection";
import AddMovie from "../pages/AddMovie/AddMovie";
import PrivateRoute from "./PrivateRoute"; 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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