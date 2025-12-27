import React, { useState, useEffect } from "react";
import RoleButtons from "../components/RoleButtons";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  const [role, setRole] = useState("user");

  // Toggle librarian theme dynamically
  useEffect(() => {
    if (role === "admin") {
      document.body.classList.remove("librarian");
    } else if (role === "user") {
      document.body.classList.remove("librarian");
    } else if (role === "librarian") {
      document.body.classList.add("librarian");
    }
  }, [role]);

  return (
    <div className="login-page">
      <RoleButtons role={role} setRole={setRole} />
      <LoginForm role={role} />

      {role === "admin" && (
        <div className="real-admin-link">
          <a href="#">RealAdmin</a>
        </div>
      )}
    </div>
  );
}

export default LoginPage;