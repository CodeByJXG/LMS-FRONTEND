import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardButton from "../components/DashboardButton";
import MessageModal from "../components/MessageModal";
import { FiMessageSquare, FiSettings, FiLogOut } from "react-icons/fi"; 
import "../styles/UserDashboard.css"; 

function UserDashboard() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const username = localStorage.getItem("username") || "Reader";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-wrapper">
        <div className="top-actions">
          <button className="settings-gear-btn" onClick={() => navigate("/user/credentials")}>
            <FiSettings size={22} />
          </button>
          <button className="logout-btn-header" onClick={handleLogout}>
            <FiLogOut size={22} />
          </button>
        </div>

        <div className="dashboard-content">
          <header className="dashboard-header">
            <h1 className="dashboard-title">LMS</h1>
            <div className="dashboard-divider"></div>
            <p className="dashboard-subtitle">Reader Portal</p>
          </header>
          
          <div className="dashboard-container">
            <DashboardButton text="Browse Catalog" onClick={() => navigate("/user/viewallbooks")} />
            <DashboardButton text="My Requests" onClick={() => navigate("/user/my-requests")} />
          </div>
        </div>

        <button className="floating-message-btn" onClick={() => setShowModal(true)}>
          <FiMessageSquare size={24} />
        </button>
      </div>

      {showModal && <MessageModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default UserDashboard;