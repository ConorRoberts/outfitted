import React from "react";
import Home from "../Home/Home";
import Header from "../Header/Header";
import {
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import "./App.scss";

const App = () => {
  return (
    <Router>
      <Header />
      <Route exact path="/">
        <Home />
      </Route>
    </Router>
  );
};

export default App;
