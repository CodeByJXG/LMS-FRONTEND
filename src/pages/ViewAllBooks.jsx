import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderButton from "../components/HeaderButton";
import "../styles/ViewAllBooks.css";

function ViewAllBooks() {
  const navigate = useNavigate();
  const [books] = useState([
    { id: 1, title: "Book One", author: "Author A", release: "2023-01-01", owner: "Librarian A" },
    { id: 2, title: "Book Two", author: "Author B", release: "2023-02-01", owner: "Librarian B" },
  ]);

  return (
    <div className="view-page">
      <HeaderButton onClick={() => navigate("/librarian/credentials")} />
      <h1 className="view-title">All Books</h1>

      <div className="view-container">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <p className="book-title">{book.title}</p>
            <p className="book-author">{book.author}</p>
            <p className="book-release">{book.release}</p>
            <p className="book-owner">Owner: {book.owner}</p>
          </div>
        ))}
      </div>

      <button className="return-btn" onClick={() => navigate("/librarian")}>Return to Dashboard</button>
    </div>
  );
}

export default ViewAllBooks;