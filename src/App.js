import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import React from "react";
import BooksApp from "./BooksApp";
import Search from "./Search";
import "./App.css";
import { getAll } from "./BooksAPI";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      error: false
    };
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
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <BooksApp
                books={this.state.books}
                onMove={this.updateBooks}
              />
            )}
          />
          <Route
            path="/search"
            render={() => (
              <Search
                myBooks={this.state.books}
                onMove={this.updateBooks}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}
export default App;
