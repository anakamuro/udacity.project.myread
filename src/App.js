import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import React from "react";
import BooksApp from "./BooksApp";
import Search from "./Search";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={BooksApp} />
        <Route path="/search" component={Search} />
      </Switch>
    </Router>
  );
};

export default App;
