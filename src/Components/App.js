import React from "react";
import { Contacts } from "./Contacts";
import { NavBar } from "./NavBar";
import {
    fetchAllContacts,
    updateContact,
    addContact,
    deleteContact
} from "../Services/ContactServices";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { ShowContact } from "./ShowContact";
import { ContactForm } from "./ContactForm";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contactsList: [],
            selectedContact: undefined,
            editSelectedContact: false,
            creatingNewContact: false,
            updateData: false,
            redirect: false
        };
        this.handleEdit = this.editingContact.bind(this);
        this.contactClicked = this.contactClicked.bind(this);
        this.newContact = this.newContact.bind(this);
        this.homeClicked = this.homeClicked.bind(this);
        this.saveContact = this.saveContact.bind(this);
        this.cancelAction = this.cancelAction.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
    }
    contactClicked(contact) {
        this.setState({
            selectedContact: contact,
            editSelectedContact: false,
            creatingNewContact: false,
            redirect: false
        });
    }
    editingContact() {
        this.setState({ editSelectedContact: true, redirect: false });
    }
    newContact() {
        this.setState({
            creatingNewContact: true,
            selectedContact: undefined,
            editSelectedContact: false,
            redirect: false
        });
    }
    saveContact(contact) {
        if (this.state.selectedContact) {
            updateContact(contact)
                .then(status => {
                    this.setState({
                        selectedContact: undefined,
                        editSelectedContact: false,
                        updateData: true,
                        creatingNewContact: false,
                        redirect: true
                    });
                    this.setState({ updateData: true });
                })
                .catch(error => {
                    alert(error);
                });
        } else {
            addContact(contact)
                .then(status => {
                    this.setState({
                        selectedContact: undefined,
                        editSelectedContact: false,
                        updateData: true,
                        creatingNewContact: false,
                        redirect: true
                    });
                })
                .catch(error => {
                    alert(error);
                });
        }
    }
    deleteContact() {
        let a = window.confirm("Are you sure to delete the contact?");
        if (a) {
            let object = this;
            deleteContact(this.state.selectedContact)
                .then(status => {
                    object.setState({ selectedContact: undefined, updateData: true });
                })
                .catch((error) => {
                    alert("something went wrong\nRequest failed");
                });
            this.setState({ redirect: true });
        }
    }
    cancelAction() {
        this.setState({
            editSelectedContact: false,
            creatingNewContact: false,
            redirect: true
        });
    }
    homeClicked() {
        this.setState({
            creatingNewContact: false,
            selectedContact: undefined,
            editSelectedContact: false
        });
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
    componentDidUpdate() {
        if (this.state.updateData) {
            this.setState({ updateData: false });
            fetchAllContacts()
                .then((data) => {
                    this.setState({
                        contactsList: data
                    })
                })
                .catch((error) => {
                    alert(error);
                });
        }
    }
    render() {
        return (
            <div className={`app`}>
                <Router>
                    <NavBar
                        newContact={this.newContact}
                        homeClicked={this.homeClicked}
                    />
                    <div className="container">
                        <Switch>
                            <Route exact path="/contacts" >
                                <Contacts
                                    contactsList={this.state.contactsList}
                                    handleEdit={this.handleEdit}
                                    contactClicked={this.contactClicked}
                                    saveContact={this.saveContact}
                                    cancelAction={this.cancelAction}
                                    deleteContact={this.deleteContact}
                                />
                            </Route>
                            <Route exact path="/">
                                <Redirect to="/contacts" />
                            </Route>
                            {this.state.redirect && <Redirect to="/contacts" />}
                            <Route exact path="/contacts/form">
                                <Contacts
                                    contactsList={this.state.contactsList}
                                    handleEdit={this.handleEdit}
                                    contactClicked={this.contactClicked}
                                    saveContact={this.saveContact}
                                    cancelAction={this.cancelAction}
                                    deleteContact={this.deleteContact}
                                />
                                <ContactForm
                                    contact={this.state.selectedContact}
                                    saveContact={this.saveContact}
                                    cancelAction={this.cancelAction}
                                />
                            </Route>
                            <Route exact path="/contacts/:id">
                                <Contacts
                                    contactsList={this.state.contactsList}
                                    handleEdit={this.handleEdit}
                                    contactClicked={this.contactClicked}
                                    saveContact={this.saveContact}
                                    cancelAction={this.cancelAction}
                                    deleteContact={this.deleteContact}
                                />
                                <ShowContact
                                    contact={this.state.selectedContact}
                                    handleEdit={this.handleEdit}
                                    deleteContact={this.deleteContact}
                                />;
                            </Route>
                            <Route exact path={"/contacts/form/:id"}>
                                <Contacts
                                    contactsList={this.state.contactsList}
                                    handleEdit={this.handleEdit}
                                    contactClicked={this.contactClicked}
                                    saveContact={this.saveContact}
                                    cancelAction={this.cancelAction}
                                    deleteContact={this.deleteContact}
                                />
                                <ContactForm
                                    contact={this.state.selectedContact}
                                    saveContact={this.saveContact}
                                    cancelAction={this.cancelAction}
                                />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}
