import React, { useEffect } from "react";
import PageLoader from "../components/PageLoader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../Redux/Auth/actions";
// import { selectCurrentAdmin } from "../Redux/Auth/selectors";

function Logout() {
  // console.log("logout");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const currentAdmin = useSelector(selectCurrentAdmin);
  // console.log("currentAdmin", currentAdmin);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    handleLogout();
    navigate("/logout");
  }, []);

  return <PageLoader />;
}

export default Logout;
