import React, { useState } from "react";
import HeaderButton from "../components/HeaderButton";
import "../styles/Requests.css";
import { FaCheck, FaTimes } from "react-icons/fa"; // icons

function Requests() {
  const [requests, setRequests] = useState([
    { id: 1, user: "User A", book: "Book One", status: "pending" },
    { id: 2, user: "User B", book: "Book Two", status: "pending" },
  ]);

  const handleAccept = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "accepted" } : req
      )
    );
  };

  const handleDecline = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "declined" } : req
      )
    );
  };

  return (
    <div className="request-page">
      <HeaderButton />
      <h1 className="request-title">Requests</h1>

      <div className="request-container">
        {requests.map((req) => (
          <div key={req.id} className="request-card">
            <div>
              <p><strong>{req.user}</strong> wants <em>{req.book}</em></p>
            </div>
            <div className="request-actions">
              {req.status === "pending" ? (
                <>
                  <button onClick={() => handleAccept(req.id)}>
                    <FaCheck />
                  </button>
                  <button onClick={() => handleDecline(req.id)}>
                    <FaTimes />
                  </button>
                </>
              ) : (
                <span className={req.status}>{req.status}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="return-btn" onClick={() => window.history.back()}>
        Return to Dashboard
      </button>
    </div>
  );
}

export default Requests;