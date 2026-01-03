import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Debugging logs - Open your F12 console to see these!
  console.log("Checking Protection:", { token: !!token, userRole });

  if (!token) {
    // No token found, send back to login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Role mismatch - send to their correct home instead of login
    return <Navigate to={userRole === "LIBRARIAN" ? "/librarian" : "/user"} replace />;
  }

  return children;
};

export default ProtectedRoute;
