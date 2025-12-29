import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import { FiBookOpen } from "react-icons/fi"; // 1. Import the open book icon
import "../styles/LayoutPage.css";

function LoginPage() {
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="login-page">
      {/* Info Button */}
      <button className="info-btn" onClick={() => setShowInfo(true)}>
        Info
      </button>

      {/* 2. Logo Wrapper placed above the form */}
      <div className="login-logo-wrapper">
        <FiBookOpen className="nb-main-logo" />
      </div>

      {/* Login Form */}
      <LoginForm />

      {/* Real Admin Button */}
      <div className="real-admin-link">
        <button 
          className="admin-link-btn"
          onClick={() => setShowAdminPrompt(true)}
        >
          Real Admin
        </button>
      </div>

      {/* Admin Prompt Modal */}
      {showAdminPrompt && (
        <div 
          className="modal-overlay active" 
          onClick={() => setShowAdminPrompt(false)}
        >
          <div 
            className="admin-prompt-modal" 
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Contact Real Admin</h3>
            <p>
              Do you want to contact the real admin to get the privilege to become a librarian?
            </p>
            <div className="admin-prompt-buttons">
              <button
                className="yes-btn"
                onClick={() => {
                  window.open("https://www.facebook.com/profile.php?id=61584060152988", "_blank");
                }}
              >
                Yes
              </button>
              <button 
                className="no-btn"
                onClick={() => setShowAdminPrompt(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfo && (
        <div 
          className="modal-overlay active" 
          onClick={() => setShowInfo(false)}
        >
          <div className="info-modal" onClick={(e) => e.stopPropagation()}>
            <h3>About Our Library Management System</h3>
            <p>The goal of this project is to create a functional Library Management System (LMS). This system will streamline processes such as borrowing books, tracking inventory, and managing user request.There are two types of users:
              <br /><br />
              1. Normal User - Can browse and borrow books.<br />
              2. Librarian - Can manage the library database, add/remove books, and handle users.
              <br /><br />
              Only the Real Admin can create a Librarian account. Use the "Real Admin" button below to contact the admin.
            </p>
            <div className="info-modal-buttons">
              <button className="info-close-btn" onClick={() => setShowInfo(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
