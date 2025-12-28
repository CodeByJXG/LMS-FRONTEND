import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLock, FiChevronLeft } from "react-icons/fi"; // Added Chevron for HeaderButton
import HeaderButton from "../components/HeaderButton";
import "../styles/UserCredentialsEdit.css";

function UserCredentialsEdit() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("librarian1");
  const [password, setPassword] = useState("password123");

  const handleSave = () => {
    alert(`Updated username: ${username}\nUpdated password: ${password}`);
  };

  return (
    <div className="credentials-page">
      {/* HeaderButton placed outside main content for fixed positioning */}
      <HeaderButton onClick={() => navigate("/librarian")} />

      <h1 className="credentials-title">Edit Credentials</h1>

      <div className="credentials-form">
        <div className="input-group">
          <label>
            <FiUser className="input-icon" /> Username
          </label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div className="input-group">
          <label>
            <FiLock className="input-icon" /> Password
          </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <div className="button-group">
          <button className="save-btn" onClick={handleSave}>Save Changes</button>
          <button className="return-btn" onClick={() => navigate("/librarian")}>
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCredentialsEdit;
