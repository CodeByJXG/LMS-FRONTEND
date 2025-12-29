import React, { useState, useEffect } from "react";
import HeaderButton from "../components/HeaderButton";
import "../styles/Requests.css";
import { FaCheck, FaTimes } from "react-icons/fa";

function Requests() {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    fetch("http://localhost:8080/api/requests/librarian/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setRequests(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Fetch error:", err));
  };

  const handleAccept = async (id) => {
    await updateStatus(id, "ACCEPTED");
  };

  const handleDecline = async (id) => {
    await updateStatus(id, "DECLINED");
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/requests/${id}/status?status=${status}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        fetchRequests(); // refresh list
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="request-page">
      <HeaderButton />
      <h1 className="request-title">Requests</h1>

      <div className="request-container">
        {requests.length > 0 ? (
          requests.map((req) => (
            <div key={req.id} className="request-card">
              <div>
                <p>
                  <strong>{req.username}</strong> wants{" "}
                  <em>{req.bookTitle}</em>
                </p>
              </div>

              <div className="request-actions">
                {req.status === "PENDING" ? (
                  <>
                    <button onClick={() => handleAccept(req.id)}>
                      <FaCheck />
                    </button>
                    <button onClick={() => handleDecline(req.id)}>
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <span className={req.status.toLowerCase()}>
                    {req.status}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-requests">No pending requests.</p>
        )}
      </div>

      <button className="return-btn" onClick={() => window.history.back()}>
        Return to Dashboard
      </button>
    </div>
  );
}

export default Requests;