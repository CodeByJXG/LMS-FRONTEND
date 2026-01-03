import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
>>>>>>> 0f21aed936d4d106e019e05da2b08af6beb68696
import HeaderButton from "../components/HeaderButton";
import { FaCheck, FaTimes } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi"; // Removed FiDownload
import "../styles/Requests.css";
<<<<<<< HEAD

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
=======
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
>>>>>>> 0f21aed936d4d106e019e05da2b08af6beb68696
    }
  };

  return (
    <div className="request-page">
      <HeaderButton />
      <h1 className="request-title">Borrowing Requests</h1>

      <div className="request-container">
<<<<<<< HEAD
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
=======
        {requests.length > 0 ? (
          requests.map((req) => (
            <div key={req.id} className="request-card">
              <div>
                <p>
                  <strong>{req.username}</strong> wants{" "}
                  <em>{req.bookTitle}</em>
                </p>
>>>>>>> 0f21aed936d4d106e019e05da2b08af6beb68696
              </div>

              <div className="request-actions">
                {req.status === "PENDING" ? (
                  <>
<<<<<<< HEAD
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
=======
                    <button onClick={() => handleAccept(req.id)}>
                      <FaCheck />
                    </button>
                    <button onClick={() => handleDecline(req.id)}>
>>>>>>> 0f21aed936d4d106e019e05da2b08af6beb68696
                      <FaTimes />
                    </button>
                  </>
                ) : (
<<<<<<< HEAD
                  <span className={`status-badge ${req.status.toLowerCase()}`}>
=======
                  <span className={req.status.toLowerCase()}>
>>>>>>> 0f21aed936d4d106e019e05da2b08af6beb68696
                    {req.status}
                  </span>
                )}
              </div>
            </div>
          ))
<<<<<<< HEAD
=======
        ) : (
          <p className="no-requests">No pending requests.</p>
>>>>>>> 0f21aed936d4d106e019e05da2b08af6beb68696
        )}
      </div>

      <button className="return-btn" onClick={() => navigate("/librarian")}>
        <FiArrowLeft /> Return to Dashboard
      </button>
    </div>
  );
}

export default Requests;
