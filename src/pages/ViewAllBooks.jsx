import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiBook, FiSearch, FiUser } from "react-icons/fi"; 
import "../styles/ViewAllBooks.css";

function ViewAllBooks() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";

  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // UPDATED: Changed from /my to /all to get global inventory
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
      .then((data) => setBooks(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [token, navigate]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    // This now allows searching across different librarians
    book.librarianUsername?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="view-page-wrapper">
      <nav className="view-navigation">
        <button className="back-arrow-btn" onClick={() => navigate("/librarian")}>
          <FiArrowLeft size={24} />
        </button>
        <div className="inventory-stats">
          <span className="stats-count">{filteredBooks.length}</span>
          <span className="stats-label">Global Records</span>
        </div>
      </nav>

      <header className="view-main-header">
        <div className="hero-logo-container">
          <FiBook size={60} />
        </div>
        <h1 className="hero-text">Library Inventory</h1>
        
        <div className="search-box-row">
          <div className="search-box-container">
            <FiSearch className="search-inner-icon" />
            <input
              type="text"
              placeholder="Search title, author, or librarian..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="scroll-viewport">
        <div className="inventory-grid-layout">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div className="view-inventory-card" key={book.id}>
                <div className="vic-top">
                  <h3 className="vic-title">{book.title}</h3>
                  <p className="vic-author">by {book.author}</p>
                </div>
                <div className="vic-bottom">
                  <p className="vic-location">
                    <FiUser size={14} style={{ marginRight: '6px', color: '#d4a574' }} />
                    <span className="librarian-display-name">
                      {/* Displays Julharie, admin, etc. */}
                      {book.librarianUsername}
                    </span>
                  </p>
                  <div className="vic-year-badge">
                    Qty: {book.availability}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No books found in the global archives.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewAllBooks;
