import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
<<<<<<< HEAD

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
=======

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
>>>>>>> 0f21aed936d4d106e019e05da2b08af6beb68696

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create" element={<CreateAccountPage />} />

        {/* --- LIBRARIAN LOGIC --- */}
        <Route
          path="/librarian"
=======
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
         <Route path="/create" element={<CreateAccountForm/>} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* LIBRARIAN ONLY ROUTES (RequiredRole="LIBRARIAN") */}
        <Route 
          path="/librarian" 
>>>>>>> 0f21aed936d4d106e019e05da2b08af6beb68696
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
<<<<<<< HEAD
        <Route
          path="/librarian/viewallbooks"
          element={
            <ProtectedRoute requiredRole="LIBRARIAN">
              <ViewAllBooksLibrarian />
            </ProtectedRoute>
          }
        />
        <Route
=======
                <Route
>>>>>>> 0f21aed936d4d106e019e05da2b08af6beb68696
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
<<<<<<< HEAD

        {/* Error Handling */}
        <Route path="*" element={<Navigate to="/login" />} />
=======
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
>>>>>>> 0f21aed936d4d106e019e05da2b08af6beb68696
      </Routes>
    </Router>
  );
}

export default App;
