// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // check JWT

  if (!token) {
    // if no token, redirect to login
    return <Navigate to="/" replace />;
  }

  return children; // token exists → render the protected page
};

export default ProtectedRoute;
