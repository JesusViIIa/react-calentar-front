import React from "react";
import { Navigate } from "react-router-dom";

export const PublicRoutes = ({ children, loggedIn }) => {
    return !loggedIn ? children : < Navigate to = { "/" }
    />;
};