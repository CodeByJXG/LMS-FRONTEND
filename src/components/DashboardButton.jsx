import React from "react";

function DashboardButton({ text, onClick }) {
  return (
    <button className="dashboard-btn" onClick={onClick}>
      {text}
    </button>
  );
}

export default DashboardButton;