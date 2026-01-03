import React, { useEffect, useState } from "react";
import { FiDownload, FiRotateCcw } from "react-icons/fi";

function UserRequest() {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:8080/api/requests/my", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(setRequests);
  }, [token]);

  const download = async (id, title) => {
    const res = await fetch(`http://localhost:8080/api/requests/${id}/download`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.pdf`;
    a.click();
  };

  const returnBook = async (id) => {
    await fetch(`http://localhost:8080/api/requests/${id}/return`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    setRequests(r => r.filter(x => x.id !== id));
  };

  return (
      <div className="ur-page">
    <div className="ur-container">
      <header className="ur-header">
        <h1>My Borrowed Books</h1>
        <button className="ur-back-btn" onClick={() => window.history.back()}>Back to Library</button>
      </header>

      <div className="ur-grid">
        {requests.map((r) => (
          <div key={r.id} className="ur-card">
            <div className="ur-info">
              <span className={`ur-badge ${r.status.toLowerCase()}`}>{r.status}</span>
              <h4>{r.bookTitle}</h4>
              <p>Request ID: #{r.id}</p>
            </div>
            
            {r.status === "ACCEPTED" && (
              <div className="ur-actions">
                <button className="ur-dl" onClick={() => download(r.id, r.bookTitle)}>
                  <FiDownload /> <span>Download</span>
                </button>
                <button className="ur-rt" onClick={() => returnBook(r.id)}>
                  <FiRotateCcw /> <span>Return</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}

export default UserRequest;