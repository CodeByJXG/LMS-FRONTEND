import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import LibrarianDashboard from "./pages/LibrarianDashboard";
import ModifyBooks from "./pages/ModifyBooks";
import ViewAllBooks from "./pages/ViewAllBooks";
import Requests from "./pages/Requests";
import UserCredentialsEdit from "./pages/UserCredentialsEdit";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create" element={<CreateAccountPage />} />

        {/* Protected Librarian routes */}
        <Route
          path="/librarian"
          element={
            <ProtectedRoute requiredRole="LIBRARIAN">
              <LibrarianDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/librarian/modify"
          element={
            <ProtectedRoute requiredRole="LIBRARIAN">
              <ModifyBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/librarian/viewallbooks"
          element={
            <ProtectedRoute requiredRole="LIBRARIAN">
              <ViewAllBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/librarian/requests"
          element={
            <ProtectedRoute requiredRole="LIBRARIAN">
              <Requests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/librarian/credentials"
          element={
            <ProtectedRoute requiredRole="LIBRARIAN">
              <UserCredentialsEdit />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;