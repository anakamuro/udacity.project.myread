import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import React from "react";
import BooksApp from "./BooksApp";
import Search from "./Search";
import "./App.css";
import * as BooksAPI from "./BooksAPI";

class App extends React.Component {
  state = {
    book: [],
    error: false
  };

  moveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).catch(err => {
      console.log(err);
      this.setState({ error: true });
    });
    if (shelf === "none") {
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id)
      }));
    } else {
      book.shelf = shelf;
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id).concat(book)
      }));
    }
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <BooksApp book={this.state.book} onMove={this.moveShelf} />
            )}
          />
          <Route
            path="/search"
            render={() => (
              <Search book={this.state.book} onMove={this.moveShelf} />
            )}
          />
        </Switch>
      </Router>
    );
  }
}
export default App;
