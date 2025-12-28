import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LayoutPage.css";

function LoginForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Send only username and password; backend will return role
      const requestBody = { username, password };
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid username or password");
      }

      const data = await response.json();
      console.log("Login success:", data);

      // Save token and role from backend
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("username", data.username);

      // Redirect based on role returned from backend
      if (data.role === "LIBRARIAN") {
        navigate("/librarian");
      } else if (data.role === "USER") {
        navigate("/user"); // normal user dashboard
      } else {
        setError("User role not recognized");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <div className="form-footer">
          <p>
            Don’t have an account? <Link to="/create">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;