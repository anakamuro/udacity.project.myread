import React from "react";
import "./App.css";
import { getAll } from "./BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";

const currentlyReadingFilter = book => book.shelf === "currentlyReading";
const readFilter = book => book.shelf === "read";
const wantToReadFilter = book => book.shelf === "wantToRead";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { books: [] };
    this.updateBooks = this.updateBooks.bind(this);
  }

  componentDidMount() {
    this.updateBooks();
  }

  updateBooks() {
    getAll().then(response => {
      this.setState({ books: response });
    });
  }

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.state.books
                      .filter(currentlyReadingFilter)
                      .map(book => (
                        <Book 
                        key={book.id} 
                        book={book} 
                        onMove={this.updateBooks} 
                        />
                      ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.state.books.filter(wantToReadFilter).map(book => (
                      <Book 
                      key={book.id}
                      book={book}
                      onMove={this.updateBooks}
                       />
                    ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.state.books.filter(readFilter).map(book => (
                      <Book 
                      key={book.id} 
                      book={book} 
                      onMove={this.updateBooks} 
                      />
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to={"/search"}>
              <button>Add a book</button>
            </Link>
          </div>
        </div>
        }
      </div>
    );
  }
}
export default BooksApp;
