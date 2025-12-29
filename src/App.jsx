import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Auth & Security
import Login from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateAccountForm from "./components/CreateAccountForm"
// Librarian Specific Pages
import LibrarianDashboard from "./pages/LibrarianDashboard";
import LibrarianViewBooks from "./pages/ViewAllBooks";
import Requests from "./pages/Requests"
import ModifyBooks from "./pages/ModifyBooks"
// User Specific Pages
import UserDashboard from "./pages/UserDashboard";
import UserViewBooks from "./pages/UserViewBooks";
import UserRequests from "./pages/UserRequests";

// Shared Pages (Logic inside handles role differences)
import UserCredentialsEdit from "./pages/UserCredentialsEdit";

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
         <Route path="/create" element={<CreateAccountForm/>} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* LIBRARIAN ONLY ROUTES (RequiredRole="LIBRARIAN") */}
        <Route 
          path="/librarian" 
          element={
            <ProtectedRoute requiredRole="LIBRARIAN">
              <LibrarianDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/librarian/viewallbooks" 
          element={
            <ProtectedRoute requiredRole="LIBRARIAN">
              <LibrarianViewBooks />
            </ProtectedRoute>
          } 
        />
       }     <Route
          path="/librarian/modify"
          element={
            <ProtectedRoute requiredRole="LIBRARIAN">
              <ModifyBooks />
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
        {/* USER ONLY ROUTES (RequiredRole="USER") */}
        <Route 
          path="/user" 
          element={
            <ProtectedRoute requiredRole="USER">
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/viewallbooks" 
          element={
            <ProtectedRoute requiredRole="USER">
              <UserViewBooks />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/my-requests" 
          element={
            <ProtectedRoute requiredRole="USER">
              <UserRequests />
            </ProtectedRoute>
          } 
        />

        {/* SHARED CREDENTIALS ROUTE */}
        {/* We don't pass a requiredRole here so both can access it, 
            but the component itself hides the Librarian name for Users */}
        <Route 
          path="/user/credentials" 
          element={
            <ProtectedRoute>
              <UserCredentialsEdit />
            </ProtectedRoute>
          } 
        />

        {/* CATCH-ALL REDIRECT */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
