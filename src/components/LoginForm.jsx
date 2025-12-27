import React, { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm({ role }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(`Logging in as ${role}: ${username} / ${password}`);
    // Connect to backend API here
  };

  return (
    <div className="login-container">
      <h2>{role === "user" ? "Login - User" : "Login - Admin"}</h2>
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
        <button type="submit">Login</button>
      </form>

      {role === "user" && (
        <div className="links">
          <Link to="/create">Create Account</Link>
        </div>
      )}
    </div>
  );
}

export default LoginForm;