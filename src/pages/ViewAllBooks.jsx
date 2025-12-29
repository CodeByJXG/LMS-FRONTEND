import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiBook, FiBookOpen, FiSearch, FiUser, FiX } from "react-icons/fi";
import "../styles/ViewAllBooks.css";

function ViewAllBooks() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";
  const role = localStorage.getItem("role");

  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/books/all", {
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (res.status === 401) navigate("/login");
        return res.json();
      })
      .then((data) => setBooks(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Fetch error:", err));
  }, [token, navigate]);

  // Search Logic: Filters by title, author, or the librarian's name
  const filteredBooks = books.filter((book) => {
    const term = searchQuery.toLowerCase();
    return (
      book.title?.toLowerCase().includes(term) ||
      book.author?.toLowerCase().includes(term) ||
      book.librarianUsername?.toLowerCase().includes(term)
    );
  });

  const handleBack = () => {
    navigate(role === "LIBRARIAN" ? "/librarian" : "/user");
  };

  return (
    <div className="view-page-wrapper">
      {/* Navigation */}
      <nav className="view-navigation">
        <button className="back-arrow-btn" onClick={handleBack}>
          <FiArrowLeft size={24} />
        </button>
        <div className="inventory-stats">
          <span className="stats-count">{filteredBooks.length}</span>
          <span className="stats-label">{searchQuery ? "Matches" : "Global Records"}</span>
        </div>
      </nav>

      {/* Header */}
      <header className="view-main-header">
        <div className="hero-logo-container">
          {
             filteredBooks.length === 0 ? <FiBook size={60} /> : <FiBookOpen size={60} />
          }
        </div>
        <h1 className="hero-text">Library Inventory</h1>

        <div className="search-box-row">
          <div className="search-box-container">
            <FiSearch className="search-inner-icon" />
            <input
              type="text"
              placeholder="Search volumes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* The Clear Button logic */}
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery("")}>
                <FiX size={18} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Scrollable viewport */}
      <div className="scroll-viewport">
        {filteredBooks.length > 0 ? (
          <div className="inventory-grid-layout">
            {filteredBooks.map((book) => (
              <div className="view-inventory-card" key={book.id}>
                <div className="vic-top">
                  <h3 className="vic-title">{book.title}</h3>
                  <p className="vic-author">by {book.author}</p>
                </div>
                <div className="vic-bottom">
                  <p className="vic-location">
                    <FiUser size={12} style={{ marginRight: '4px', color: '#d4a574' }} />
                    <span>{book.librarianUsername}</span>
                  </p>
                  <div className="vic-year-badge">Qty: {book.availability}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results-container">
            <p className="no-results">
              {searchQuery 
                ? `No results for "${searchQuery}"` 
                : "The library is currently empty."}
            </p>
            {searchQuery && (
              <button className="reset-search-btn" onClick={() => setSearchQuery("")}>
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewAllBooks;
