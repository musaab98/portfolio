import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/#" className="navbar-item">
              Home
            </a>
            <a href="/#about" className="navbar-item">
              About
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {/* <button className="button is-small is-light" onClick={this.props.toggleTheme}>
                  Toggle Night Mode
                </button> */}
                <a href="mailto:elsheikh.musaab@gmail.com" className="button is-primary">
                  <strong>Contact Me</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
