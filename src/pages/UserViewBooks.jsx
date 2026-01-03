import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiArrowLeft, 
  FiBook, 
  FiSearch, 
  FiUser, 
  FiSend, 
  FiBookOpen, 
  FiX, 
  FiClock, 
  FiCheck, 
  FiXCircle 
} from "react-icons/fi"; 
import "../styles/UserViewAllBooks.css";

function UserViewBooks() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";
  const [books, setBooks] = useState([]);
  const [myRequests, setMyRequests] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // 1. Fetch All Books
    fetch("http://localhost:8080/api/books/all", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setBooks(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));

    // 2. Fetch My Request History
    fetch("http://localhost:8080/api/requests/user/my-requests", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setMyRequests(data))
      .catch((err) => console.error(err));
  }, [token]);

  const handleRequest = async (book) => {
    try {
      const response = await fetch("http://localhost:8080/api/requests/submit", {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          bookTitle: book.title,
          librarianName: book.librarianUsername
        })
      });

      if (response.ok) {
        alert("Request sent!");
        // Refresh history to update UI
        const updated = await fetch("http://localhost:8080/api/requests/user/my-requests", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await updated.json();
        setMyRequests(data);
      } else {
        const msg = await response.text();
        alert(msg);
      }
    } catch (err) {
      alert("Error sending request");
    }
  };

  const filtered = books.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRequestStatus = (title) => {
    const req = myRequests.find(r => r.bookTitle === title);
    return req ? req.status : null;
  };

  return (
    <div className="view-page-wrapper">
      <nav className="view-navigation">
        <button className="back-arrow-btn" onClick={() => navigate("/user")}>
          <FiArrowLeft size={24} />
        </button>
        <div className="inventory-stats">
          <span className="stats-count">{filtered.length}</span>
          <span className="stats-label">Volumes Found</span>
        </div>
      </nav>

      <header className="view-main-header">
        <div className="hero-logo-container">
          {filtered.length === 0 ? <FiBook size={60} /> : <FiBookOpen size={60} />}
        </div>
        <h1 className="hero-text">Library Catalog</h1>
        <div className="search-box-row">
          <div className="search-box-container">
            <FiSearch className="search-inner-icon" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery("")}>
                <FiX />
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="scroll-viewport">
        <div className="inventory-grid-layout">
          {filtered.map((book) => {
            const status = getRequestStatus(book.title);
            return (
              <div className="view-inventory-card user-variant" key={book.id}>
                <div className="vic-top">
                  <h3 className="vic-title">{book.title}</h3>
                  <p className="vic-author">by {book.author}</p>
                  
                  {/* --- ACTION LOGIC START --- */}
                  {status ? (
                    /* Existing Request takes priority */
                    <button className={`status-badge-btn ${status.toLowerCase()}`} disabled>
                      {status === "PENDING" && <FiClock />}
                      {status === "ACCEPTED" && <FiCheck />}
                      {status}
                    </button>
                  ) : (
                    /* If no request, check stock availability */
                    book.availability > 0 ? (
                      <button className="user-request-btn" onClick={() => handleRequest(book)}>
                        <FiSend size={12} /> Request Access
                      </button>
                    ) : (
                      /* If stock is zero, replace button with Out of Stock Badge */
                      <button className="status-badge-btn out-of-stock" disabled>
                        <FiXCircle /> Out of Stock
                      </button>
                    )
                  )}
                  {/* --- ACTION LOGIC END --- */}
                  
                </div>
                <div className="vic-bottom">
                  <p className="vic-location">
                    <FiUser size={14}/> {book.librarianUsername}
                  </p>
                  <div className={`vic-year-badge ${book.availability === 0 ? 'zero-stock' : ''}`}>
                    Qty: {book.availability}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserViewBooks;
