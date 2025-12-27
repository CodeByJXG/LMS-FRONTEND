import React, { useState } from "react";
import { Link } from "react-router-dom";

function CreateAccountPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    console.log(`Creating account: ${username} / ${password}`);
    // Connect to backend API here
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
          <button type="submit">Create Account</button>
        </form>
        <div className="links">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountPage;