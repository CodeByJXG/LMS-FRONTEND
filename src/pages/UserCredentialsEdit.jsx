import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLock, FiTag, FiXCircle, FiCheckCircle } from "react-icons/fi"; 
import HeaderButton from "../components/HeaderButton";
import "../styles/UserCredentialsEdit.css";

function UserCredentialsEdit() {
  const navigate = useNavigate();
  const [librarianUsername, setLibrarianUsername] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  // Get the role to determine what to show
  const role = localStorage.getItem("role"); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Unable to fetch user data");
        
        const data = await response.json();
        setLibrarianUsername(data.librarianUsername || "");
        setUsername(data.username || "");
      } catch (err) {
        console.error(err);
        alert("Session expired. Please log in again.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchUser();
    else navigate("/login");
  }, [token, navigate]);

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
  };

  if (loading) return <div className="loading">Loading credentials...</div>;

  return (
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
        </div>
      </div>
    </div>
  );
}

export default UserCredentialsEdit;
