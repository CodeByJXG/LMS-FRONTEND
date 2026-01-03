import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LayoutPage.css";

function CreateAccountForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 1. Frontend descriptive validation
    if (username.trim().length < 3) {
      setError("Username Requirement: Your chosen name is too short. Please use at least 3 characters.");
      setLoading(false);
      return;
    }
    if (password.length < 5) {
      setError("Security Requirement: This password is too easy to guess. Please use 5 or more characters.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role: "USER" }),
      });

      // 2. CRASH PREVENTION: Get raw text instead of jumping to .json()
      const responseBody = await response.text();
      let data = {};

      if (responseBody) {
        try {
          data = JSON.parse(responseBody);
        } catch (parseError) {
          // If the server sent plain text instead of JSON, we use that text as the message
          data = { message: responseBody };
        }
      }

      // 3. Descriptive Error Mapping based on Status Codes
      if (!response.ok) {
        if (response.status === 409) {
          throw new Error(`The username "${username}" is already in use by another library member.`);
        } else if (response.status === 400) {
          throw new Error(data.message || "The server rejected your registration. Ensure no special characters are used.");
        } else if (response.status === 500) {
          throw new Error("Internal Server Error: The library database is temporarily offline. Please try again later.");
        } else {
          throw new Error(data.message || "An unexpected communication error occurred between your browser and the server.");
        }
      }

      // 4. Success Path
      alert("Registration Successful! Welcome to the library.");
      navigate("/login");

    } catch (err) {
      // 5. Friendly Network/System Error Handling
      if (err.message.includes("Failed to fetch")) {
        setError("Connection Problem: We cannot reach the library server. Please check your Wi-Fi or server status.");
      } else {
        // This displays our custom "throw new Error" messages from Step 3
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <header className="form-header">
          <h2>Create User Account</h2>
          <p>Register to view and request book archives.</p>
        </header>

        <form onSubmit={handleCreate} className="registration-form">
          <div className="input-field">
            <label>Choose Username</label>
            <input
              type="text"
              placeholder="e.g. LibraryReader99"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-field">
            <label>Choose Password</label>
            <input
              type="password"
              placeholder="Keep it secret, keep it safe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Creating Profile..." : "Sign Up"}
          </button>
        </form>

        {/* Display descriptive error messages clearly */}
        {error && (
          <div className="descriptive-error-box">
            <p className="error-title">Unable to Create Account</p>
            <p className="error-body">{error}</p>
          </div>
        )}

        <div className="form-footer">
          <p>
            Already a member? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountForm;
