import React, { Component } from "react";

export default class HeaderComponent extends Component {
  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-sm fixed-top navbar-dark bg-dark">
          <div className="container">
            <a href="#" className="navbar-brand">
              Start Bootstrap
            </a>
            <button className="navbar-toggler d-md-none" data-target="#myNav" data-toggle="collapse">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="myNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="#" className="nav-link active">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
