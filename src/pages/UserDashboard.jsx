<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardButton from "../components/DashboardButton";
import MessageModal from "../components/MessageModal";
import { FiMessageSquare, FiUser, FiSettings, FiLogOut } from "react-icons/fi"; 
import "../styles/UserDashboard.css";
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardButton from "../components/DashboardButton";
import MessageModal from "../components/MessageModal";
import { FiMessageSquare, FiSettings, FiLogOut } from "react-icons/fi"; 
import "../styles/UserDashboard.css"; 
>>>>>>> 0f21aed936d4d106e019e05da2b08af6beb68696

function UserDashboard() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
<<<<<<< HEAD
  const [username, setUsername] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/auth/me", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!response.ok) throw new Error("Unauthorized");
        
        const data = await response.json();
        setUsername(data.username);
      } catch (error) {
        console.error("Session Error:", error);
        localStorage.clear();
        navigate("/login");
      }
    };
    
    if (token) fetchUser();
    else navigate("/login");
  }, [token, navigate]);
=======
  const username = localStorage.getItem("username") || "Reader";
>>>>>>> 0f21aed936d4d106e019e05da2b08af6beb68696

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
<<<<<<< HEAD
    <div className="user-dashboard-page">
      {/* Top Navigation Bar Logic */}
      <div className="user-nav-top">
        <button className="user-nav-btn logout" onClick={handleLogout} title="Logout">
          <FiLogOut size={20} />
        </button>
        <button className="user-nav-btn settings" onClick={() => navigate("/user/credentials")} title="Profile Settings">
          <FiSettings size={20} />
        </button>
      </div>

      <div className="user-dashboard-wrapper">
        <div className="user-profile-mini">
          <FiUser size={20} />
          <span>{username}</span>
        </div>

        <div className="dashboard-content">
          <header className="user-dashboard-header">
            <h1 className="user-dashboard-title">Library Reader</h1>
            <div className="user-dashboard-divider"></div>
            <p className="user-dashboard-subtitle">Personal Archive Access</p>
          </header>
          
          <div className="user-dashboard-container">
            <DashboardButton 
              text="View All Books" 
              onClick={() => navigate("/user/viewall")} 
            />
            <DashboardButton 
              text="My Requests" 
              onClick={() => navigate("/user/requests")} 
            />
            {/* Added a shortcut to profile inside the container too */}
            <DashboardButton 
              text="Account Settings" 
              onClick={() => navigate("/user/credentials")} 
            />
          </div>
        </div>

        {/* Messaging Logic */}
        <button className="user-floating-message-btn" onClick={() => setShowModal(true)}>
=======
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
>>>>>>> 0f21aed936d4d106e019e05da2b08af6beb68696
          <FiMessageSquare size={24} />
        </button>
      </div>

      {showModal && <MessageModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

<<<<<<< HEAD
export default UserDashboard;
=======
export default UserDashboard;
>>>>>>> 0f21aed936d4d106e019e05da2b08af6beb68696
