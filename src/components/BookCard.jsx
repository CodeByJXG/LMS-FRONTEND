import React from "react";

function BookCard() {
  return (
    <div className="book-card">
      <div className="book-info">
        <div className="book-title">Book Title</div>
        <div className="book-author">Author Name</div>
        <div className="book-date">Published: 2024</div>
      </div>

      <div className="book-actions">
        <button className="edit-btn">✏️</button>
        <button className="delete-btn">🗑️</button>
      </div>
    </div>
  );
}

export default BookCard;