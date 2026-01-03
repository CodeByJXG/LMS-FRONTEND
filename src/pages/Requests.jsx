import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderButton from "../components/HeaderButton";
import { FaCheck, FaTimes } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi"; // Removed FiDownload
import "../styles/Requests.css";

function Requests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const API_URL = "http://localhost:8080/api/requests";

  const token = localStorage.getItem("token");

  const getAuthHeader = () => ({
    Authorization: `Bearer ${token}`,
  });

  const fetchRequests = async () => {
    try {
      console.log("📡 Fetching librarian requests...");
      const res = await fetch(`${API_URL}/librarian/all`, {
        headers: getAuthHeader(),
      });

      if (!res.ok) {
        console.error("Failed to fetch requests:", res.status);
        return;
      }

      const data = await res.json();
      console.log("📦 Backend returned:", data);
      setRequests(data);
    } catch (err) {
      console.error("❌ Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/${id}/status?status=${status}`, {
        method: "PUT",
        headers: getAuthHeader(),
      });

      if (res.ok) {
        fetchRequests(); // Refresh list
      } else {
        const errorText = await res.text();
        alert(errorText);
      }
    } catch (err) {
      console.error("❌ Update error:", err);
    }
  };

  return (
    <div className="request-page">
      <HeaderButton />
      <h1 className="request-title">Borrowing Requests</h1>

      <div className="request-container">
        {requests.length === 0 ? (
          <p className="no-requests">
            No pending requests at the moment.
            <br />
            <strong>Check back later!</strong>
          </p>
        ) : (
          requests.map((req) => (
            <div key={req.id} className="request-card">
              <div className="request-info">
                <p>
                  <strong>{req.username}</strong> requested{" "}
                  <em>{req.bookTitle}</em>
                </p>

                <p style={{ fontSize: "12px", color: "#888" }}>
                  Librarian: <b>{req.librarianName}</b>
                </p>
              </div>

              <div className="request-actions">
                {req.status === "PENDING" ? (
                  <>
                    <button
                      className="accept-btn"
                      onClick={() => updateStatus(req.id, "ACCEPTED")}
                      title="Accept Request"
                    >
                      <FaCheck />
                    </button>
                    <button
                      className="decline-btn"
                      onClick={() => updateStatus(req.id, "DECLINED")}
                      title="Decline Request"
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <span className={`status-badge ${req.status.toLowerCase()}`}>
                    {req.status}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <button className="return-btn" onClick={() => navigate("/librarian")}>
        <FiArrowLeft /> Return to Dashboard
      </button>
    </div>
  );
}

export default Requests;
