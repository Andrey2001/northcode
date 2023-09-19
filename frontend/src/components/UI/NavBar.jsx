import React from 'react';
import logo from '../images/logo.png';
import "./styles.css"

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid" style={{backgroundColor: "white"}} >
          <img src={logo} className="w-25 h-25 mx-auto" alt="Logo"/>
      </div>
    </nav>
  );
}

export default NavBar;

