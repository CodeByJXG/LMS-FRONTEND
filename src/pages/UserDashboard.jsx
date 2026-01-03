import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardButton from "../components/DashboardButton";
import MessageModal from "../components/MessageModal";
import { FiMessageSquare, FiUser, FiSettings, FiLogOut } from "react-icons/fi"; 
import "../styles/UserDashboard.css";

function UserDashboard() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
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
          <FiMessageSquare size={24} />
        </button>
      </div>

      {showModal && <MessageModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default UserDashboard;
