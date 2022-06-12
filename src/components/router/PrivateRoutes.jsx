import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children, loggedIn }) => {
  return loggedIn ? children : <Navigate to={"/auth/login"} />;
};
