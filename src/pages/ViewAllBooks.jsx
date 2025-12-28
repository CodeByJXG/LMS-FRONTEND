import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiBook, FiSearch } from "react-icons/fi"; 
import "../styles/ViewAllBooks.css";

function ViewAllBooks() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";

  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch books from backend on mount
  useEffect(() => {
    fetch("http://localhost:8080/api/books/my", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Failed to fetch books:", err));
  }, [token]);

  // Filter books by search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.owner?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="view-page-wrapper">
      {/* 1. Nav Bar: Arrow Left, Count Right */}
      <nav className="view-navigation">
        <button className="back-arrow-btn" onClick={() => navigate("/librarian")}>
          <FiArrowLeft size={24} />
        </button>
        <div className="inventory-stats">
          <span className="stats-count">{filteredBooks.length}</span>
          <span className="stats-label">Books Registered</span>
        </div>
      </nav>

      {/* 2. Centered Header Section */}
      <header className="view-main-header">
        <div className="hero-logo-container">
          <FiBook size={60} />
        </div>
        <h1 className="hero-text">Library Inventory</h1>
        
        {/* Centered Search Bar */}
        <div className="search-box-row">
          <div className="search-box-container">
            <FiSearch className="search-inner-icon" />
            <input
              type="text"
              placeholder="Search the archives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* 3. Scrollable Grid Area */}
      <div className="scroll-viewport">
        <div className="inventory-grid-layout">
          {filteredBooks.map((book) => (
            <div className="view-inventory-card" key={book.id}>
              <div className="vic-top">
                <h3 className="vic-title">{book.title}</h3>
                <p className="vic-author">by {book.author}</p>
              </div>
              <div className="vic-bottom">
                <p className="vic-location"><span>p</span> {book.owner || "Unknown"}</p>
                <div className="vic-year-badge">{book.release || "N/A"}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewAllBooks;