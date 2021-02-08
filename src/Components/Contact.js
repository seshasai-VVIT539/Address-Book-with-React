import React from "react";
import {
  Link,
} from "react-router-dom";

export class Contact extends React.Component {

  render() {
    const to="/contacts/"+this.props.data.ID;
    return (
      <div
        className='contact'
        onClick={() => this.props.onClick(this.props.data)}
      >
        <div className='firstName'>
          <Link to={to}>
            {this.props.data.Name}
          </Link>
        </div>
      </div>
    );
  }
}
