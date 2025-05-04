import { lazy } from "react";
import { Navigate } from "react-router";
// import Dashboard from "../pages/Dashboard";

const Logout = lazy(() => import("../pages/Logout"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Profile = lazy(() => import("../pages/Profile"));

let routes = {
  expense: [],
  default: [
    {
      path: "/login",
      element: <Navigate to="/" />,
    },
    {
      path: "/verify/*",
      element: <Navigate to="/" />,
    },
    {
      path: "/resetpassword/*",
      element: <Navigate to="/" />,
    },
    {
      path: "/register",
      element: <Navigate to="/" />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ],
};

export default routes;
