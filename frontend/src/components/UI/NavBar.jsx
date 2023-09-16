import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import "./styles.css"

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid" style={{backgroundColor: "#372F3A"}} >
        <div className="d-flex align-items-center">
          <img src={logo} className="w-25 h-25" alt="Logo" />
          <Link to="/" className="navbar-brand ml-4">
            <h4 style={{color: "#FEF5E7"}}>Home</h4>
          </Link>
          <Link to="/about" className="navbar-brand">
            <h4 style={{color: "#FEF5E7"}}>About us</h4>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
