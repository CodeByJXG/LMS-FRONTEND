import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { FiBookOpen } from "react-icons/fi";
import "../styles/LayoutPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

 const handleLoginSuccess = (data) => {
  // 1. Clear anything old first
  localStorage.clear();

  // 2. Normalize and Save
  const cleanRole = data.role.toUpperCase().replace("ROLE_", "").trim();
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", cleanRole);
  localStorage.setItem("username", data.username);

  console.log("Login Success. Role saved as:", cleanRole);

  // 3. The "Anti-Kick" Delay
  // Giving the browser 50ms to finish writing to LocalStorage
  setTimeout(() => {
    if (cleanRole === "LIBRARIAN") {
      navigate("/librarian", { replace: true });
    } else {
      navigate("/user", { replace: true });
    }
  }, 50);
};

  return (
    <div className="login-page">
      <button className="info-btn" onClick={() => setShowInfo(true)}>Info</button>
      
      <div className="login-logo-wrapper">
        <FiBookOpen className="nb-main-logo" />
      </div>

      {/* Pass the function to the form */}
      <LoginForm onLoginSuccess={handleLoginSuccess} />

      <div className="real-admin-link">
        <button className="admin-link-btn" onClick={() => setShowAdminPrompt(true)}>
          Real Admin
        </button>
      </div>

      {/* ... Your existing Modals (AdminPrompt and Info) ... */}
      {showAdminPrompt && (
        <div className="modal-overlay active" onClick={() => setShowAdminPrompt(false)}>
            <div className="admin-prompt-modal">
                <h3>Contact Real Admin</h3>
                <p>Do you want to contact the real admin?</p>
                <div className="admin-prompt-buttons">
                    <button className="yes-btn" onClick={() => window.open("https://facebook.com/...", "_blank")}>Yes</button>
                    <button className="no-btn" onClick={() => setShowAdminPrompt(false)}>No</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
