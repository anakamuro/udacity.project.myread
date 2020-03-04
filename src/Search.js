import React from "react";
import Book from "./Book";
import { search } from "./BooksAPI";
import { Link } from "react-router-dom";
import "./App.css";

class Search extends React.Component {
  state = {
    results: [],
    error: null,
    query: ""
  };

  handleSearch = e => {
    const query = e.target.value;
    this.setState({ query }, this.updateResults);
  };

  updateResults = () => {
    const query = this.state.query;
    search(query).then(response => {
      if (response.error) {
        this.setState({ error: response.error });
      } else {
        this.setState({ results: response, error: null });
      }
    });
  };

  onMove = () => {
    this.updateResults();
  };

  render() {
    const { results, error } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to={"/"}>
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              onChange={this.handleSearch}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {error ? error : results.map(book => <Book book={book} />)}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
