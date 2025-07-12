import { lazy } from "react";
import { Navigate } from "react-router";
import UserDashboard from "../pages/UserDashboard";
// import Dashboard from "../pages/Dashboard";

const Logout = lazy(() => import("../pages/Logout"));
const Dashboard = lazy(() => import("../pages/LandingPage"));
const Profile = lazy(() => import("../pages/Profile"));
const ItemListing = lazy(() => import("../pages/ItemListing"));
const AdminPanel = lazy(() => import("../pages/AdminPanel"));

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
    {
      path:"/userdashboard",
      element: <UserDashboard />,
    },
    {
      path: "/itemlisting",
      element: <ItemListing/>,
    },
    {
      path: "/adminpanel",
      element: <AdminPanel />,
    }

  ],
};

export default routes;
