import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlus, FiArrowLeft, FiFileText } from "react-icons/fi";
import HeaderButton from "../components/HeaderButton";
import "../styles/ModifyBooks.css";

function BookModal({ isOpen, type, bookData, onClose, onSave }) {
  const [formData, setFormData] = useState({ title: "", author: "", availability: "" });
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      setFormData(bookData ? { ...bookData } : { title: "", author: "", availability: "" });
      setFileName("");
    }
  }, [isOpen, bookData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const handleSave = () => {
    const fileSelected = fileInputRef.current?.files[0];
    if (!formData.title.trim() || !formData.author.trim() || formData.availability === "") {
      alert("Please fill in all fields.");
      return;
    }
    // Type check for PDF on new archives
    if (type === "add" && !fileSelected) {
      alert("PDF manuscript is required.");
      return;
    }
    onSave(formData, fileSelected);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay active" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="book-form">
        <h2>{type === "add" ? "New Archive" : "Edit Record"}</h2>
        <label>Book Title
          <input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
        </label>
        <label>Author Name
          <input value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} />
        </label>
        <label>Stock Quantity
          <input type="number" value={formData.availability} onChange={e => setFormData({ ...formData, availability: e.target.value })} />
        </label>
        <label className="file-label">
          Manuscript (PDF Required)
          <div className={`file-input-wrapper ${fileName ? "has-file" : ""}`}>
            <FiFileText className="file-icon" />
            <span className="file-display-name">{fileName || "Choose PDF..."}</span>
            <input type="file" accept=".pdf" ref={fileInputRef} onChange={handleFileChange} />
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
  const [books, setBooks] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, type: "add", data: null });

  // Your Spring Boot API endpoint
  const API_URL = "http://localhost:8080/api/books"; 

  // 1. Get Token helper
  const getAuthHeader = () => {
    const token = localStorage.getItem("token"); // Assumes you store JWT in localStorage
    return token ? { "Authorization": `Bearer ${token}` } : {};
  };

  // 2. FETCH BOOKS (Filtered by librarian on backend)
  const fetchBooks = async () => {
    try {
      const res = await fetch(`${API_URL}/my`, { headers: getAuthHeader() });
      if (res.status === 401) return navigate("/login");
      const data = await res.json();
      setBooks(data);
    } catch (err) { console.error("Fetch error:", err); }
  };

  useEffect(() => { fetchBooks(); }, []);

  // 3. DELETE BOOK
  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { 
        method: "DELETE", 
        headers: getAuthHeader() 
      });
      if (res.ok) setBooks(books.filter(b => b.id !== id));
    } catch (err) { console.error("Delete error:", err); }
  };

  // 4. ADD / UPDATE BOOK (Using Multipart/FormData)
  const handleSaveBook = async (formData, file) => {
    const url = modal.type === "add" ? API_URL : `${API_URL}/${modal.data.id}`;
    const method = modal.type === "add" ? "POST" : "PUT";

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("author", formData.author);
    payload.append("availability", formData.availability);
    if (file) payload.append("pdfFile", file); // Must match @RequestParam name in Java

    try {
      const res = await fetch(url, {
        method: method,
        headers: getAuthHeader(), // Fetch automatically sets Content-Type for FormData
        body: payload
      });

      if (res.ok) {
        fetchBooks(); 
        setModal({ ...modal, isOpen: false });
      } else {
        const errorMsg = await res.text();
        alert("Error: " + errorMsg);
      }
    } catch (err) { console.error("Save error:", err); }
  };

  return (
    <div className="modify-page">
      <HeaderButton onClick={() => navigate("/librarian/credentials")} />
      <div className="title-wrapper">
        <h1 className="modify-title">Library Inventory</h1>
      </div>
      <div className="modify-container">
        {books.map(book => {
          const count = Number(book.availability);
          const stockClass = count <= 0 ? "stock-red" : count < 5 ? "stock-yellow" : "stock-green";
          return (
            <div className="book-card" key={book.id}>
              <div className="book-info">
                <p className="book-title">{book.title}</p>
                <p className="book-author">By {book.author}</p>
                <p className={`book-availability ${stockClass}`}>
                  {count <= 0 ? "OUT OF STOCK" : `In Stock: ${count}`}
                </p>
              </div>
              <div className="book-actions">
                <button onClick={() => setModal({ isOpen: true, type: "edit", data: book })}><FiEdit /></button>
                <button onClick={() => handleDelete(book.id, book.title)}><FiTrash2 /></button>
              </div>
            </div>
          );
        })}
      </div>
      <button className="back-menu-btn" onClick={() => navigate("/librarian")}><FiArrowLeft /> Back to Dashboard</button>
      <button className="add-btn" onClick={() => setModal({ isOpen: true, type: "add", data: null })}><FiPlus /></button>
      
      <BookModal 
        isOpen={modal.isOpen} 
        type={modal.type} 
        bookData={modal.data} 
        onClose={() => setModal({ ...modal, isOpen: false })} 
        onSave={handleSaveBook}
      />
    </div>
  );
}
