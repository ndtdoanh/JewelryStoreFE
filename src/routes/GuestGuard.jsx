import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { selectAuth, selectToken } from "../slices/auth.slice";

const GuestGuard = ({ children }) => {
  const token = useSelector(selectToken);
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();

  if (token) {
    if (auth.IsLogin === "False") {
      navigate("/login-first-time");
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default GuestGuard;
