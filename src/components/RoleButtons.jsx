import React from "react";

function RoleButtons({ role, setRole }) {
  return (
    <div className="role-buttons">
      <button
        className={role === "user" ? "active" : ""}
        onClick={() => setRole("user")}
      >
        User
      </button>
      <button
        className={role === "admin" ? "active" : ""}
        onClick={() => setRole("admin")}
      >
        Admin
      </button>
    </div>
  );
}

export default RoleButtons;