import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardButton from "../components/DashboardButton";
import MessageModal from "../components/MessageModal";
import { FiMessageSquare, FiSettings } from "react-icons/fi"; 
import "../styles/LibrarianDashboard.css";

function LibrarianDashboard() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  
  // Setup States
  const [needsSetup, setNeedsSetup] = useState(false);
  const [libUsernameInput, setLibUsernameInput] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/auth/me", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
        
        // If librarianUsername is null or empty, trigger the setup overlay
        if (!data.librarianUsername) {
          setNeedsSetup(true);
        }
      } catch (error) {
        console.error("Error fetching user status:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) checkUserStatus();
    else navigate("/login");
  }, [token, navigate]);

  const handleSetupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/update-librarian-id", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ librarianUsername: libUsernameInput }),
      });

      if (response.ok) {
        setNeedsSetup(false);
      } else {
        const err = await response.json();
        alert(err.message || "Failed to update username.");
      }
    } catch (err) {
      alert("Server error. Please try again.");
    }
  };

  if (loading) return <div className="loading-screen">Loading Dashboard...</div>;

  return (
    <div className="dashboard-page">
      {/* UNSKIPPABLE OVERLAY */}
      {needsSetup && (
        <div className="unskippable-overlay">
          <div className="setup-card">
            <h2>Librarian Profile Setup</h2>
            <p>Please enter a unique <strong>Librarian Name</strong> to manage books. This is public and separate from your login credentials.</p>
            <form onSubmit={handleSetupSubmit}>
              <input 
                type="text" 
                placeholder="e.g. John_Doe_Library" 
                value={libUsernameInput}
                onChange={(e) => setLibUsernameInput(e.target.value)}
                required
              />
              <button type="submit" className="setup-submit-btn">Initialize Account</button>
            </form>
          </div>
        </div>
      )}

      {/* DASHBOARD CONTENT */}
      <div className={`dashboard-wrapper ${needsSetup ? "blurred-content" : ""}`}>
        <button 
          className="settings-gear-btn" 
          onClick={() => navigate("/librarian/credentials")}
          title="Edit Credentials"
          disabled={needsSetup}
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

        <button 
          className="floating-message-btn" 
          onClick={() => setShowModal(true)}
          disabled={needsSetup}
        >
          <FiMessageSquare size={24} />
        </button>
      </div>

      {showModal && <MessageModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default LibrarianDashboard;
