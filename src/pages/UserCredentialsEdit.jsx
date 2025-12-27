import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLock } from "react-icons/fi";
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
      <HeaderButton onClick={() => navigate("/librarian")} />
      <h1 className="credentials-title">Edit Credentials</h1>

      <div className="credentials-form">
        <div>
          <label><FiUser /> Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div>
          <label><FiLock /> Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <div className="button-group">
          <button className="save-btn" onClick={handleSave}>Save Changes</button>
          <button className="return-btn" onClick={() => navigate("/librarian")}>Return to Dashboard</button>
        </div>
      </div>
    </div>
  );
}

export default UserCredentialsEdit;