import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardButton from "../components/DashboardButton";
import MessageModal from "../components/MessageModal";
import { FiMessageSquare, FiSettings } from "react-icons/fi"; 
import "../styles/LibrarianDashboard.css";

function LibrarianDashboard() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="dashboard-page">
      {/* Settings Gear - Positioned absolutely so it won't affect the vertical flow */}
      <button 
        className="settings-gear-btn" 
        onClick={() => navigate("/librarian/credentials")}
        title="Edit Credentials"
      >
        <FiSettings size={24} />
      </button>

      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Librarian</h1>
          <div className="dashboard-divider"></div>
          <p className="dashboard-subtitle">Management Portal</p>
        </header>
        
        <div className="dashboard-container">
          <DashboardButton text="Modify Books" onClick={() => navigate("/librarian/modify")} />
          <DashboardButton text="View All Books" onClick={() => navigate("/librarian/viewallbooks")} />
          <DashboardButton text="Requests" onClick={() => navigate("/librarian/requests")} />
        </div>
      </div>

      <button className="floating-message-btn" onClick={() => setShowModal(true)}>
        <FiMessageSquare size={24} />
      </button>

      {showModal && <MessageModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default LibrarianDashboard;
