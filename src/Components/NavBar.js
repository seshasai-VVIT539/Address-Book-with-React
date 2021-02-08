import React from "react";
import logo from "../img.png";
import { Link } from "react-router-dom";

export class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <div className="options">
          <div
            id="home"
            className="option"
            onClick={() => { this.props.homeClicked() }}
          >
            <Link to="/contacts">HOME</Link>
          </div>
          <div
            id="new"
            className="option"
            onClick={() => { this.props.newContact() }}
          >
            <Link to="/contacts/form">+ ADD</Link>
          </div>
        </div>
        <img src={logo} />
      </div>
    );
  }
}
