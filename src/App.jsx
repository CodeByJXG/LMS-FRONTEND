import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import LibrarianDashboard from "./pages/LibrarianDashboard";
import ModifyBooks from "./pages/ModifyBooks";
import ViewAllBooks from "./pages/ViewAllBooks";
import Requests from "./pages/Requests";
import UserCredentialsEdit from "./pages/UserCredentialsEdit";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard route */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create" element={<CreateAccountPage />} />
        <Route path="/librarian" element={<LibrarianDashboard />} />
        <Route path="/librarian/modify" element={<ModifyBooks />} />
        <Route path="/librarian/viewallbooks" element={<ViewAllBooks />} />
        <Route path="/librarian/requests" element={<Requests />} />
        <Route path="/librarian/credentials" element={<UserCredentialsEdit />} />
      </Routes>
    </Router>
  );
}

export default App;