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
<<<<<<< HEAD
  const storedRole = localStorage.getItem("role");
=======
  // Get the role to determine what to show
  const role = localStorage.getItem("role"); 
>>>>>>> 0f21aed936d4d106e019e05da2b08af6beb68696

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

<<<<<<< HEAD
  const handleSave = () => {
    // For standard users, they usually can't change their login username 
    // without a password re-verification, so we show a success message 
    // or link to a password change logic here.
    alert("Profile settings viewed. Return to dashboard.");
    navigate("/user");
  };

  const handleCancel = () => {
    navigate(storedRole === "LIBRARIAN" ? "/librarian" : "/user");
=======
  const handleSave = async () => {
    // If user is just a regular USER, we don't need to call the librarian update API
    if (role !== "LIBRARIAN") {
      navigate("/user");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/update-librarian-id", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ librarianUsername }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Failed to update librarian name");
      }

      alert("Profile updated successfully!");
      navigate("/librarian");
    } catch (err) {
      alert(err.message || "Failed to save credentials.");
    }
  };

  const handleCancel = () => {
    // Navigate back based on role
    navigate(role === "LIBRARIAN" ? "/librarian" : "/user");
>>>>>>> 0f21aed936d4d106e019e05da2b08af6beb68696
  };

  if (loading) return <div className="user-cred-loading">Loading Profile...</div>;

  return (
<<<<<<< HEAD
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
=======
    <div className="credentials-page">
      <HeaderButton onClick={handleCancel} />
      <h1 className="credentials-title">Profile Settings</h1>

      <div className="credentials-form">
        
        {/* ONLY SHOW LIBRARIAN NAME IF ROLE IS LIBRARIAN */}
        {role === "LIBRARIAN" && (
          <div className="input-group">
            <label><FiTag className="input-icon" /> Librarian Display Name</label>
            <input 
              type="text" 
              placeholder="e.g. Main_Library_Admin"
              value={librarianUsername} 
              onChange={e => setLibrarianUsername(e.target.value)} 
            />
            <small className="help-text">This name will be linked to all books you upload.</small>
          </div>
        )}

        <div className="input-group">
          <label><FiUser className="input-icon" /> Login Username</label>
          <input type="text" value={username} disabled className="disabled-input" />
          {role !== "LIBRARIAN" && (
            <small className="help-text">Username cannot be changed by the user.</small>
          )}
        </div>

        <div className="button-group">
          <button className="cancel-btn" onClick={handleCancel}>
            <FiXCircle style={{ marginRight: '8px' }} /> Cancel
          </button>
          
          <button className="save-btn" onClick={handleSave}>
            <FiCheckCircle style={{ marginRight: '8px' }} /> 
            {role === "LIBRARIAN" ? "Save Changes" : "Back to Home"}
          </button>
>>>>>>> 0f21aed936d4d106e019e05da2b08af6beb68696
        </div>
      </div>
    </div>
  );
}

export default UserCredentialsEdit;

