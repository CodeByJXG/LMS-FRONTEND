import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderButton from "../components/HeaderButton";
import DashboardButton from "../components/DashboardButton";
import MessageModal from "../components/MessageModal";
import { FiMessageSquare } from "react-icons/fi";
import "../styles/LibrarianDashboard.css";

function LibrarianDashboard() {
  const navigate = useNavigate();
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  return (
    <div className="dashboard-page">
      {/* Top-left settings button */}
      <HeaderButton onClick={() => navigate("/librarian/credentials")} />

      {/* Center content */}
      <div className="dashboard-content">
        <h1 className="dashboard-title">Librarian</h1>
        <div className="dashboard-container">
          <DashboardButton text="Modify Books" onClick={() => navigate("/librarian/modify")} />
          <DashboardButton text="View All Books" onClick={() => navigate("/librarian/viewallbooks")} />
          <DashboardButton text="Requests" onClick={() => navigate("/librarian/requests")} />
        </div>
      </div>

      {/* Bottom-right message button */}
      <button 
        className="message-button" 
        onClick={() => setIsMessageModalOpen(true)}
      >
        <FiMessageSquare size={20} />
      </button>

      {/* Message Modal */}
      {isMessageModalOpen && (
        <MessageModal onClose={() => setIsMessageModalOpen(false)} />
      )}
    </div>
  );
}

export default LibrarianDashboard;