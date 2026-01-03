import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

<<<<<<< HEAD
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

=======
  // 1. If there is no token, they aren't logged in at all
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. If a specific role is required (LIBRARIAN or USER)
  if (requiredRole && role !== requiredRole) {
    // If a User tries to enter a Librarian route, send them to User Home
    // If a Librarian tries to enter a User route, send them to Librarian Home
    const redirectPath = role === "LIBRARIAN" ? "/librarian" : "/user";
    return <Navigate to={redirectPath} replace />;
  }

  // 3. If they are logged in and have the correct role (or no role is required for the page)
>>>>>>> 0f21aed936d4d106e019e05da2b08af6beb68696
  return children;
};

export default ProtectedRoute;
