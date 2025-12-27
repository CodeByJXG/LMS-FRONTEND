import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderButton from "../components/HeaderButton";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import "../styles/ModifyBooks.css";

function ModifyBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([
    { id: 1, title: "Book One", author: "Author A", release: "2023-01-01", availability: 5, pdfFile: null },
    { id: 2, title: "Book Two", author: "Author B", release: "2023-02-01", availability: 0, pdfFile: null },
  ]);

  // Modal state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [formData, setFormData] = useState({ 
    title: "", 
    author: "", 
    release: "", 
    availability: 0,
    pdfFile: null 
  });
  const [errors, setErrors] = useState({});

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((b) => b.id !== id));
    }
  };

  const openEdit = (book) => {
    setCurrentBook(book);
    setFormData({ ...book });
    setIsEditOpen(true);
    setErrors({});
  };

  const handleAdd = () => {
    setFormData({ title: "", author: "", release: "", availability: 0, pdfFile: null });
    setIsAddOpen(true);
    setErrors({});
  };

  const handleSaveEdit = () => {
    if (!formData.availability && formData.availability !== 0) {
      setErrors({ availability: "Please enter availability" });
      return;
    }
    setBooks(books.map((b) => (b.id === currentBook.id ? formData : b)));
    setIsEditOpen(false);
    setErrors({});
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData({ ...formData, pdfFile: file });
      setErrors({ ...errors, pdfFile: null });
    } else if (file) {
      alert("Please select a PDF file only.");
      e.target.value = null;
      setFormData({ ...formData, pdfFile: null });
    }
  };

  const validateAddForm = () => {
    const newErrors = {};
    
    if (!formData.title || formData.title.trim() === "") {
      newErrors.title = "Title is required";
    }
    
    if (!formData.author || formData.author.trim() === "") {
      newErrors.author = "Author is required";
    }
    
    if (!formData.release) {
      newErrors.release = "Release date is required";
    }
    
    if (!formData.pdfFile) {
      newErrors.pdfFile = "PDF file is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddBook = () => {
    if (!validateAddForm()) {
      alert("Please fill in all required fields.");
      return;
    }

    const newBook = { ...formData, id: Date.now() };
    setBooks([...books, newBook]);
    setIsAddOpen(false);
    setErrors({});
  };

  return (
    <div className="modify-page">
      <HeaderButton onClick={() => navigate("/librarian/credentials")} />
      <h1 className="modify-title">Modify Books</h1>

      <div className="modify-container">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <div className="book-info">
              <p className="book-title">{book.title}</p>
              <p className="book-author">{book.author}</p>
              <p className="book-release">{book.release}</p>
              <p className="book-availability">{book.availability}/{book.availability}</p>
            </div>
            <div className="book-actions">
              <button onClick={() => openEdit(book)}><FiEdit /></button>
              <button onClick={() => handleDelete(book.id)}><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Add button */}
      <button className="add-btn" onClick={handleAdd}><FiPlus /></button>

      {/* Return to dashboard */}
      <button className="return-btn" onClick={() => navigate("/librarian")}>Return to Dashboard</button>

      {/* Add Modal */}
      {isAddOpen && (
        <div className="modal-overlay" onClick={() => setIsAddOpen(false)}>
          <div className="book-form" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Book</h2>
            
            <label>
              Title *
              <input 
                type="text" 
                placeholder="Enter book title" 
                value={formData.title} 
                onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                className={errors.title ? "error" : ""}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </label>
            
            <label>
              Author *
              <input 
                type="text" 
                placeholder="Enter author name" 
                value={formData.author} 
                onChange={(e) => setFormData({ ...formData, author: e.target.value })} 
                className={errors.author ? "error" : ""}
              />
              {errors.author && <span className="error-message">{errors.author}</span>}
            </label>
            
            <label>
              Release Date *
              <input 
                type="date" 
                value={formData.release} 
                onChange={(e) => setFormData({ ...formData, release: e.target.value })} 
                className={errors.release ? "error" : ""}
              />
              {errors.release && <span className="error-message">{errors.release}</span>}
            </label>
            
            <label>
              Availability *
              <input 
                type="number" 
                placeholder="Number of copies" 
                min="0"
                value={formData.availability} 
                onChange={(e) => setFormData({ ...formData, availability: parseInt(e.target.value) || 0 })} 
              />
            </label>

            <label className="file-upload-wrapper">
              Upload PDF File *
              <input 
                type="file" 
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className={errors.pdfFile ? "error" : ""}
              />
              {formData.pdfFile && (
                <span className="file-info">Selected: {formData.pdfFile.name}</span>
              )}
              {!formData.pdfFile && !errors.pdfFile && (
                <span className="file-info">Only PDF files are accepted</span>
              )}
              {errors.pdfFile && <span className="error-message">{errors.pdfFile}</span>}
            </label>

            <div className="book-form-actions">
              <button className="save-btn" onClick={handleAddBook}>Add Book</button>
              <button className="cancel-btn" onClick={() => setIsAddOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="modal-overlay" onClick={() => setIsEditOpen(false)}>
          <div className="book-form" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Book</h2>
            <label>
              Availability
              <input 
                type="number" 
                placeholder="Number of copies" 
                min="0"
                value={formData.availability} 
                onChange={(e) => setFormData({ ...formData, availability: parseInt(e.target.value) || 0 })} 
                className={errors.availability ? "error" : ""}
              />
              {errors.availability && <span className="error-message">{errors.availability}</span>}
            </label>
            <div className="book-form-actions">
              <button className="save-btn" onClick={handleSaveEdit}>Save Changes</button>
              <button className="cancel-btn" onClick={() => setIsEditOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModifyBooks;