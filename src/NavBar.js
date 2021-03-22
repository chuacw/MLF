import React from 'react';
import './css/mlf.css';

function NavBar(props) {
  return (
  <div className="w3-top">
    <div className="w3-bar w3-white w3-wide w3-padding w3-card">
      <a href="/#home" className="w3-bar-item w3-button"><b>MLF</b> Connecting People</a>
      <div className="w3-right w3-hide-small">
        <a href="/#about" className="w3-bar-item w3-button">About</a>
        <a href="/#services" className="w3-bar-item w3-button">Services</a>
        <a href="/#testimonials" className="w3-bar-item w3-button">Testimonials</a>
      </div>
    </div>
  </div>
  );
}

export default NavBar;
