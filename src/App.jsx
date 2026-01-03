import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Auth Components
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./components/CreateAccountForm";

// Librarian Specific Pages
import LibrarianDashboard from "./pages/LibrarianDashboard";
import ModifyBooks from "./pages/ModifyBooks";
import ViewAllBooksLibrarian from "./pages/ViewAllBooks"; 
import LibrarianRequests from "./pages/Requests";
import LibrarianCredentialsEdit from "./pages/LibrarianCredentialsEdit"; 

// User (Reader) Specific Pages
import UserDashboard from "./pages/UserDashboard";
import UserViewAllBooks from "./pages/UserViewAllBooks";
import UserRequest from "./pages/UserRequest";
import UserCredentialsEdit from "./pages/UserCredentialsEdit"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create" element={<CreateAccountPage />} />

        {/* --- LIBRARIAN LOGIC --- */}
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
              <ViewAllBooksLibrarian />
            </ProtectedRoute>
          }
        />
        <Route
          path="/librarian/requests"
          element={
            <ProtectedRoute requiredRole="LIBRARIAN">
              <LibrarianRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/librarian/credentials"
          element={
            <ProtectedRoute requiredRole="LIBRARIAN">
              <LibrarianCredentialsEdit />
            </ProtectedRoute>
          }
        />

        {/* --- USER LOGIC --- */}
        <Route
          path="/user"
          element={
            <ProtectedRoute requiredRole="USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/viewall"
          element={
            <ProtectedRoute requiredRole="USER">
              <UserViewAllBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/requests"
          element={
            <ProtectedRoute requiredRole="USER">
              <UserRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/credentials"
          element={
            <ProtectedRoute requiredRole="USER">
              <UserCredentialsEdit />
            </ProtectedRoute>
          }
        />

        {/* Error Handling */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
