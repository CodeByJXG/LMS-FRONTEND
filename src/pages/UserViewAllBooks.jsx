import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSearch, FiSend, FiClock, FiCheckCircle } from "react-icons/fi";
import "../styles/UserViewAllBooks.css";

function UserViewAllBooks() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  // ================= AUTH HEADERS =================
  const authHeader = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  // ================= FETCH BOOKS + USER REQUESTS =================
  const fetchData = async () => {
    try {
      const [booksRes, reqRes] = await Promise.all([
        fetch("http://localhost:8080/api/books/all", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:8080/api/requests/my", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (booksRes.ok) setBooks(await booksRes.json());
      if (reqRes.ok) setRequests(await reqRes.json());
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= SEND REQUEST (FIXED) =================
  const handleSendRequest = async (book) => {
    try {
      const res = await fetch("http://localhost:8080/api/requests/create", {
        method: "POST",
        headers: authHeader,
        body: JSON.stringify({
          bookTitle: book.title,
          // 🔴 THIS IS THE FIX — MUST MATCH BACKEND FIELD
          librarianName: book.librarianUsername,
        }),
      });

      if (res.ok) {
        fetchData(); // refresh UI
      } else {
        const msg = await res.text();
        alert(msg);
      }
    } catch (err) {
      console.error("Request error:", err);
    }
  };

  // ================= GET REQUEST STATUS =================
  const getRequestStatus = (bookTitle) => {
    const req = requests.find((r) => r.bookTitle === bookTitle);
    return req ? req.status : null;
  };

  return (
    <div className="uv-page">
      {/* ---------- NAV ---------- */}
      <nav className="uv-nav">
        <button className="uv-back" onClick={() => navigate("/user")}>
          <FiArrowLeft />
        </button>

        <div className="uv-search-wrapper">
          <FiSearch />
          <input
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </nav>

      {/* ---------- BOOK GRID ---------- */}
      <div className="uv-grid">
        {books
          .filter((b) =>
            b.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((book) => {
            const status = getRequestStatus(book.title);

            return (
              <div className="uv-card" key={book.id}>
                <h3>{book.title}</h3>
                <p>By {book.author}</p>

                <div className="uv-card-footer">
                  <span className="uv-lib">
                    Librarian: {book.librarianUsername}
                  </span>

                  {/* ---------- STATUS / REQUEST BUTTON ---------- */}
                  {status ? (
                    <span className={`uv-status ${status.toLowerCase()}`}>
                      {status === "PENDING" && <FiClock />}
                      {status === "ACCEPTED" && <FiCheckCircle />}
                      {status}
                    </span>
                  ) : (
                    <button
                      className="uv-req-btn"
                      disabled={book.availability === 0}
                      onClick={() => handleSendRequest(book)}
                    >
                      <FiSend /> Request
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default UserViewAllBooks;