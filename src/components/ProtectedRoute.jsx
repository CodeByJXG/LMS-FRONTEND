import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  console.log("ProtectedRoute check:", { token, role, requiredRole });

  // If no token, redirect to login
  if (!token) {
    console.log("No token found, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // If requiredRole is specified, check if user has that role
  if (requiredRole && role !== requiredRole) {
    console.log("Role mismatch, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // User is authenticated and has correct role
  return children;
}

export default ProtectedRoute;