import React from "react";
import { Contact } from "./Contact";
import {
  fetchAllContacts,
} from "../Services/ContactServices";

export class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactsList: undefined
    };
  }
  componentDidMount() {
    fetchAllContacts()
      .then((data) => {
        this.setState({ contactsList: data });
      })
      .catch((error) => {
        alert(error);
      });
  }
  render() {
    let contactList = this.state.contactsList;
    let contactsToDisplay;
    if (contactList) {
      contactsToDisplay = contactList.map((contact) =>
        <Contact
          data={contact}
          key={contact.ID}
          onClick={this.props.contactClicked}
        />
      );
    }

    return (
      <div className="container">
        <div id="contacts">
          <h3>CONTACTS</h3>
          {contactsToDisplay}
        </div>
      </div>
    );
  }
}
