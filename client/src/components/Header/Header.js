import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <div className="Header">
      <ul>
        <li className="logo-container">
          <Link to="/">LOGO</Link>
        </li>
        <li>
          <nav>
            <ul className="nav-container">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          </nav>
        </li>
      </ul>
    </div>
  );
};

export default Header;
