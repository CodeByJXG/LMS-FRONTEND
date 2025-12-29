import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

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
  return children;
}

export default ProtectedRoute;
