import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateAccountPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // to redirect after success

  const handleCreate = async (e) => {
    e.preventDefault();

    const newUser = {
      username,
      password,
      role: "USER" // Only normal user
    };

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create account");
      }

      alert("Account created successfully! You can now login.");

      // Clear form
      setUsername("");
      setPassword("");

      // Redirect to login page
      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Create Account</h2>
        <form onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <div className="links">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountPage;