import React from "react";
import { update } from "./BooksAPI";

const Book = props => {
  // Tittle, author, image
  const { book, onMove } = props;
  const {
    authors = [],
    imageLinks = { thumbnail: "" },
    title = "",
    shelf = "none"
  } = book;
  // authors = book.authors

  const handleShelfChange = e => {
    const shelf = e.target.value;
    update(book, shelf).then(response => {
      onMove();
    });
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 188,
              backgroundImage: `url(${imageLinks.thumbnail})`
            }}
          />
          <div className="book-shelf-changer">
            {/* Need to add function to move */}
            <select value={shelf} onChange={handleShelfChange}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>

            {/* update(book, "read") */}
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(", ")}</div>
      </div>
    </li>
  );
};

export default Book;
