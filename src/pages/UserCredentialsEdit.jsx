import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiXCircle, FiCheckCircle, FiShield } from "react-icons/fi"; 
import HeaderButton from "../components/HeaderButton";
import "../styles/UserCredentialsEdit.css";

function UserCredentialsEdit() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Unable to fetch user data");
        
        const data = await response.json();
        setUsername(data.username || "");
        setRole(data.role || "");
      } catch (err) {
        console.error(err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchUser();
    else navigate("/login");
  }, [token, navigate]);

  const handleSave = () => {
    // For standard users, they usually can't change their login username 
    // without a password re-verification, so we show a success message 
    // or link to a password change logic here.
    alert("Profile settings viewed. Return to dashboard.");
    navigate("/user");
  };

  const handleCancel = () => {
    navigate(storedRole === "LIBRARIAN" ? "/librarian" : "/user");
  };

  if (loading) return <div className="user-cred-loading">Loading Profile...</div>;

  return (
    <div className="user-cred-page">
      <HeaderButton onClick={handleCancel} />
      
      <div className="user-cred-content">
        <h1 className="user-cred-title">Account Details</h1>
        
        <div className="user-cred-form">
          <div className="user-cred-info-section">
            <FiShield size={40} className="shield-icon" />
            <p>You are logged in as a <strong>{role}</strong></p>
          </div>

          <div className="u-input-group">
            <label><FiUser className="u-icon" /> Current Username</label>
            <input 
              type="text" 
              value={username} 
              disabled 
              className="u-disabled" 
            />
            <small className="u-help">Login usernames are managed by the library administrator.</small>
          </div>

          <div className="u-button-group">
            <button className="u-cancel-btn" onClick={handleCancel}>
              <FiXCircle /> Back
            </button>
            <button className="u-save-btn" onClick={handleSave}>
              <FiCheckCircle /> Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCredentialsEdit;

