import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiBook, FiSearch } from "react-icons/fi"; 
import "../styles/ViewAllBooks.css";

function ViewAllBooks() {
  const navigate = useNavigate();
  const [books] = useState([
    { id: 1, title: "Chronicles of the Astral Tides", author: "Elara Vane", release: "2024", owner: "Starfall Archives" },
    { id: 2, title: "Sonnets for a Bespoke Star", author: "Malik Khan", release: "2022", owner: "Jaxom Grey" },
    { id: 3, title: "The Near-Future Anthology", author: "Anya Sharra", release: "2025", owner: "Sunstone Nook" },
    { id: 4, title: "Echoes of Silent Earth", author: "Jonas Thorne", release: "2021", owner: "The Iron Vault" },
    { id: 5, title: "Whispers of the Void", author: "Sara L.", release: "2023", owner: "Archive Wing B" },
  ]);

  return (
    <div className="view-page-wrapper">
      {/* 1. Nav Bar: Arrow Left, Count Right */}
      <nav className="view-navigation">
        <button className="back-arrow-btn" onClick={() => navigate("/librarian")}>
          <FiArrowLeft size={24} />
        </button>
        <div className="inventory-stats">
          <span className="stats-count">{books.length}</span>
          <span className="stats-label">Books Registered</span>
        </div>
      </nav>

      {/* 2. Centered Header Section */}
      <header className="view-main-header">
        <div className="hero-logo-container">
          <FiBook size={60} />
        </div>
        <h1 className="hero-text">Library Inventory</h1>
        
        {/* Centered Search Bar with side margins */}
        <div className="search-box-row">
          <div className="search-box-container">
            <FiSearch className="search-inner-icon" />
            <input type="text" placeholder="Search the archives..." />
          </div>
        </div>
      </header>

      {/* 3. Scrollable Grid Area */}
      <div className="scroll-viewport">
        <div className="inventory-grid-layout">
          {books.map((book) => (
            <div className="view-inventory-card" key={book.id}>
              <div className="vic-top">
                <h3 className="vic-title">{book.title}</h3>
                <p className="vic-author">by {book.author}</p>
              </div>
              <div className="vic-bottom">
                <p className="vic-location"><span>p</span> {book.owner}</p>
                <div className="vic-year-badge">{book.release}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewAllBooks;
