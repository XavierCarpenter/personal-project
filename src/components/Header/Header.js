import React from "react";
import "./Header.css"
import { Link, withRouter } from "react-router-dom";

import logo from "../../logo.svg";

const Header = () => (
  <header className="App-header">
    <h1 className="App-title">Wavvie</h1>
    <div className="search">
    <input type="text" placeholder="Search..."/>
    <button type="submit"><i className="fas fa-search"></i></button>
    </div>
    <div className="nav">
      <Link to="/businesses">
        <p>Explore</p>
      </Link>
      <Link to="/login">
        <p>Login</p>
      </Link>
    </div>
  </header>
);

export default withRouter(Header);
