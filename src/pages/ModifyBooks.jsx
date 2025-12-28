import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlus, FiArrowLeft, FiFileText } from "react-icons/fi";
import HeaderButton from "../components/HeaderButton"; // Added this back
import "../styles/ModifyBooks.css";

function BookModal({ isOpen, type, bookData, onClose, onSave }) {
  // Use empty string for availability to prevent the "stuck 0" issue
  const [formData, setFormData] = useState({ title: "", author: "", availability: "" });
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      // If editing, load data; if adding, start fresh with empty string
      setFormData(bookData ? { ...bookData } : { title: "", author: "", availability: "" });
    }
  }, [isOpen, bookData]);

  const handleSave = () => {
    const fileSelected = fileInputRef.current?.files[0];

    // Check all text inputs
    if (!formData.title.trim() || !formData.author.trim() || formData.availability === "") {
      alert("Please fill in all fields (Title, Author, and Stock).");
      return;
    }

    // Strict PDF Requirement for adding a NEW book
    if (type === "add" && !fileSelected) {
      alert("Error: A PDF manuscript is required to archive a new book.");
      return;
    }

    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay active" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="book-form">
        <h2>{type === "add" ? "New Archive" : "Edit Record"}</h2>
        
        <label>
          Book Title
          <input 
            placeholder="e.g. The Great Gatsby" 
            value={formData.title} 
            onChange={e => setFormData({ ...formData, title: e.target.value })} 
          />
        </label>

        <label>
          Author Name
          <input 
            placeholder="e.g. F. Scott Fitzgerald" 
            value={formData.author} 
            onChange={e => setFormData({ ...formData, author: e.target.value })} 
          />
        </label>

        <label>
          Stock Quantity
          <input 
            type="number" 
            placeholder="Enter amount" 
            value={formData.availability} 
            onChange={e => setFormData({ ...formData, availability: e.target.value })} 
          />
        </label>

        <label className="file-label">
          Manuscript (PDF Required)
          <div className="file-input-wrapper">
            <FiFileText className="file-icon" />
            <input type="file" accept=".pdf" ref={fileInputRef} />
          </div>
        </label>

        <div className="book-form-actions">
          <button className="save-btn" onClick={handleSave}>Save Archive</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default function ModifyBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", availability: 12 },
    { id: 2, title: "Modern Physics", author: "Albert Einstein", availability: 3 },
    { id: 3, title: "Empty Journal", author: "Unknown", availability: 0 }
  ]);

  const [modal, setModal] = useState({ isOpen: false, type: "add", data: null });

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you certain you wish to delete "${title}"?`)) {
      setBooks(books.filter(b => b.id !== id));
    }
  };

  return (
    <div className="modify-page">
      {/* 1. Header Button for Credentials (Top Left) */}
      <HeaderButton onClick={() => navigate("/librarian/credentials")} />

      <div className="title-wrapper">
        <h1 className="modify-title">Library Inventory</h1>
      </div>

      <div className="modify-container">
        {books.map(book => {
          // Calculate stock styles dynamically
          const count = Number(book.availability);
          let stockClass = "stock-green";
          let stockLabel = `In Stock: ${count}`;

          if (count <= 0) {
            stockClass = "stock-red";
            stockLabel = "OUT OF STOCK";
          } else if (count < 5) {
            stockClass = "stock-yellow";
            stockLabel = `LOW STOCK: ${count}`;
          }

          return (
            <div className="book-card" key={book.id}>
              <div className="book-info">
                <p className="book-title">{book.title}</p>
                <p className="book-author">By {book.author}</p>
                <p className={`book-availability ${stockClass}`}>{stockLabel}</p>
              </div>
              <div className="book-actions">
                <button onClick={() => setModal({ isOpen: true, type: "edit", data: book })}>
                  <FiEdit />
                </button>
                <button onClick={() => handleDelete(book.id, book.title)}>
                  <FiTrash2 />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Back Button (Below the Container) */}
      <button className="back-menu-btn" onClick={() => navigate("/librarian")}>
        <FiArrowLeft /> Back to Dashboard
      </button>

      {/* 3. Floating Add Button */}
      <button className="add-btn" onClick={() => setModal({ isOpen: true, type: "add", data: null })}>
        <FiPlus />
      </button>

      <BookModal 
        isOpen={modal.isOpen} 
        type={modal.type} 
        bookData={modal.data} 
        onClose={() => setModal({ ...modal, isOpen: false })} 
        onSave={(data) => {
          if (modal.type === "add") {
            setBooks([...books, { ...data, id: Date.now() }]);
          } else {
            setBooks(books.map(b => b.id === modal.data.id ? { ...b, ...data } : b));
          }
          setModal({ ...modal, isOpen: false });
        }}
      />
    </div>
  );
}
