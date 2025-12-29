import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiArrowLeft, 
  FiDownload, 
  FiClock, 
  FiCheckCircle, 
  FiXCircle, 
  FiRotateCcw,
  FiAlertCircle 
} from "react-icons/fi";
import "../styles/UserRequests.css";

function UserRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token") || "";

  // 1. FETCH USER REQUESTS
  const fetchUserRequests = useCallback(() => {
    setLoading(true);
    fetch("http://localhost:8080/api/requests/user/my-requests", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
        return res.json();
      })
      .then((data) => setRequests(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, [token, navigate]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchUserRequests();
    }
  }, [token, fetchUserRequests, navigate]);

  // 2. DOWNLOAD HANDLER
  const handleDownload = async (requestId, bookTitle) => {
    try {
      const response = await fetch(`http://localhost:8080/api/requests/${requestId}/download`, {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!response.ok) throw new Error("File not found on server.");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const safeTitle = bookTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      link.setAttribute("download", `${safeTitle}_manuscript.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Download failed: " + err.message);
    }
  };

  // 3. RETURN HANDLER
  const handleReturn = async (requestId) => {
    if (!window.confirm("Return this archive? Your access will be revoked and stock updated.")) return;

    try {
      const response = await fetch(`http://localhost:8080/api/requests/${requestId}/return`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.ok) {
        setRequests((prev) => prev.filter((r) => r.id !== requestId));
        alert("Archive returned successfully!");
      } else {
        alert("Failed to process return.");
      }
    } catch (err) {
      console.error("Return error:", err);
    }
  };

  return (
    <div className="request-page">
      <button className="header-button" onClick={() => navigate("/user")}>
        <FiArrowLeft />
      </button>

      <h1 className="request-title">Correspondence</h1>

      <div className="request-container">
        {loading ? (
          <div className="empty-state">Scanning Archives...</div>
        ) : requests.length > 0 ? (
          requests.map((req) => (
            <div key={req.id} className={`request-card ${req.bookStock === 0 ? 'out-of-stock-card' : ''}`}>
              <div className="request-info">
                <p className="request-user">{req.bookTitle}</p>
                <p className="request-book">Librarian: {req.librarianName}</p>
                {/* Stock Warning Logic */}
                {req.bookStock === 0 && req.status?.toUpperCase() === "PENDING" && (
                  <p className="stock-warning">
                    <FiAlertCircle /> Unavailable: Wait for returns
                  </p>
                )}
              </div>
              
              <div className="status-zone">
                {/* PENDING UI */}
                {req.status?.toUpperCase() === "PENDING" && (
                  <span className="badge-pill b-pending">
                    <FiClock /> Pending
                  </span>
                )}
                
                {/* ACCEPTED UI */}
                {req.status?.toUpperCase() === "ACCEPTED" && (
                  <div className="active-action-group">
                    <button className="user-return-btn-pill" onClick={() => handleReturn(req.id)}>
                      <FiRotateCcw /> Return Archive
                    </button>
                    
                    <div className="accepted-status-row">
                      <span className="badge-pill b-active">
                        <FiCheckCircle /> Active
                      </span>
                      <button 
                        className="user-download-btn-pill" 
                        onClick={() => handleDownload(req.id, req.bookTitle)}
                      >
                        <FiDownload />
                      </button>
                    </div>
                  </div>
                )}

                {/* DECLINED UI */}
                {req.status?.toUpperCase() === "DECLINED" && (
                  <span className="badge-pill b-declined">
                    <FiXCircle /> Declined
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No active correspondence found.</p>
          </div>
        )}
      </div>
      
      <button className="return-dashboard-btn" onClick={() => navigate("/user")}>
        Return to Dashboard
      </button>
    </div>
  );
}

export default UserRequests;
