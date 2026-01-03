import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlus, FiArrowLeft, FiFileText } from "react-icons/fi";
import HeaderButton from "../components/HeaderButton";
import "../styles/ModifyBooks.css";

function BookModal({ isOpen, type, bookData, onClose, onSave }) {
  const [formData, setFormData] = useState({ title: "", author: "", availability: 0 });
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: bookData?.title || "",
        author: bookData?.author || "",
        availability: bookData?.availability || 0,
      });
      setFileName("");
      if (fileInputRef.current) fileInputRef.current.value = null;
    }
  }, [isOpen, bookData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
    else setFileName("");
  };

  const handleSave = () => {
    const fileSelected = fileInputRef.current?.files[0];

    // --- Enhanced Local Validation Messages ---
    if (!formData.title.trim()) {
      alert("Missing Information: Please enter a Book Title.");
      return;
    }
    if (!formData.author.trim()) {
      alert("Missing Information: Please enter the Author's name.");
      return;
    }

    if (type === "add" && !fileSelected) {
      alert("File Required: You must upload a PDF manuscript to register a new book.");
      return;
    }

    const availabilityNum = parseInt(formData.availability);
    if (isNaN(availabilityNum)) {
      alert("Invalid Input: Availability must be a valid number.");
      return;
    }
    if (availabilityNum < 0) {
      alert("Invalid Input: Stock availability cannot be a negative number.");
      return;
    }

    onSave({ ...formData, availability: availabilityNum }, fileSelected);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay active" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="book-form">
        <h2>{type === "add" ? "New Book" : "Edit Book"}</h2>
        <label>
          Title
          <input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </label>
        <label>
          Author
          <input
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />
        </label>
        <label>
          Availability
          <input
            type="number"
            min="0"
            value={formData.availability}
            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
          />
        </label>
        <label className="file-label">
          Manuscript (PDF)
          <div className={`file-input-wrapper ${fileName ? "has-file" : ""}`}>
            <FiFileText className="file-icon" />
            <span className="file-display-name">{fileName || "Choose PDF..."}</span>
            <input type="file" accept=".pdf" ref={fileInputRef} onChange={handleFileChange} />
          </div>
        </label>
        <div className="book-form-actions">
          <button className="save-btn" onClick={handleSave}>Save</button>
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
  const API_URL = "http://localhost:8080/api/books";

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchBooks = async () => {
    try {
      const res = await fetch(`${API_URL}/my`, { headers: getAuthHeader() });
      if (res.status === 401) return navigate("/login");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Fetch error:", err);
      // alert("Error: Could not retrieve your book list from the server.");
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE", headers: getAuthHeader() });
      if (res.ok) {
        setBooks(books.filter(b => b.id !== id));
      } else {
        alert("Delete Failed: You might not have permission to remove this book.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Network Error: Unable to reach the server to delete the book.");
    }
  };

  const handleSaveBook = async (formData, file) => {
    const url = modal.type === "add" ? API_URL : `${API_URL}/${modal.data.id}`;
    const method = modal.type === "add" ? "POST" : "PUT";

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("author", formData.author);
    payload.append("availability", formData.availability);
    if (file) payload.append("pdfFile", file);

    try {
      const res = await fetch(url, {
        method,
        headers: getAuthHeader(),
        body: payload,
      });

      if (res.ok) {
        fetchBooks();
        setModal({ ...modal, isOpen: false });
      } else {
        // --- Enhanced Server Error Descriptions ---
        let errorMsg = "";
        switch (res.status) {
          case 400:
            errorMsg = "Bad Request: The server could not process the data. Please check if all fields are correct.";
            break;
          case 401:
            errorMsg = "Unauthorized: Your session has expired. Please log in again.";
            break;
          case 403:
            errorMsg = "Forbidden: You do not have permission to modify this book record.";
            break;
          case 413:
            errorMsg = "File Too Large: The PDF file you are trying to upload exceeds the server's size limit.";
            break;
          case 500:
            errorMsg = "Server Error: An internal error occurred on the server. This might be due to a storage failure.";
            break;
          default:
            const serverText = await res.text();
            errorMsg = serverText || `Unexpected Error (Status: ${res.status})`;
        }
        alert(`System Error:\n${errorMsg}`);
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Connection Failure: Could not connect to the library server. Please check your internet or if the backend is running.");
    }
  };

  return (
    <div className="modify-page">
      <HeaderButton onClick={() => navigate("/librarian/credentials")} />
      <h1 className="modify-title">Library Inventory</h1>
      <div className="modify-container">
        {books.map((book) => {
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
      <button className="back-menu-btn" onClick={() => navigate("/librarian")}><FiArrowLeft /> Back</button>
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
