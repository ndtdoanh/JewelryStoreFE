import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  logout,
  selectAuth,
  selectExpired,
  selectRefreshToken,
  selectToken,
  setAuth,
  setExpired,
  setRefreshToken,
  setToken,
} from "../slices/auth.slice";
import { notification } from "antd";
import { useRefreshTokenMutation } from "../services/authAPI";
import { jwtDecode } from "jwt-decode"; // import dependency

const AuthGuard = ({ allowedRoles, children }) => {
  const [refreshToken] = useRefreshTokenMutation();
  const token = useSelector(selectToken);
  const reToken = useSelector(selectRefreshToken);
  const auth = useSelector(selectAuth);
  const isLogin = auth?.IsLogin;
  const exp = useSelector(selectExpired);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // console.log(auth?.IsLogin);

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const now = Math.floor(Date.now() / 1000);
      // const now = 1720319769;
      const refreshThreshold = 60; // 1 minute before expiration
      // console.log(exp + " and " + now + " and " + refreshThreshold);
      if (exp && exp - now <= refreshThreshold) {
        try {
          const result = await refreshToken({
            refreshToken: reToken,
            accessTokenToken: token,
          });
          const dataRefresh = result.data.data;
          // console.log(dataRefresh);
          const newToken = dataRefresh.accessTokenToken;
          const newRefreshToken = dataRefresh.refreshToken;
          const newAuth = jwtDecode(newToken); // decode your token here
          notification.success({
            message: "Token Refreshed",
            description: "Your session has been extended.",
          });
          // console.log(newAuth);
          dispatch(setToken(newToken));
          dispatch(setRefreshToken(newRefreshToken));
          dispatch(setExpired(newAuth.exp));
          dispatch(setAuth(newAuth));
        } catch (error) {
          dispatch(logout());
          notification.error({
            message: "Token Refresh Failed",
            description: "Please login again.",
          });
          // navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };

    checkTokenExpiration();
  }, [exp, refreshToken, reToken, token, dispatch, navigate]);

  // if (auth?.IsLogin === "False") {
  //   navigate("/login-first-time");
  // }

  if (isLogin === "False") {
    return <Navigate to="/login" replace />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists and user is not trying to access restricted routes, allow access
  return <Outlet />;
};

export default AuthGuard;
