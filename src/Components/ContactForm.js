import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { validateForm } from "../validation";
import {
  fetchAllContacts,
} from "../Services/ContactServices";

export function ContactForm(props) {
  let { id } = useParams();
  let [selectedContact, setSelectedContact] = useState({ undefined });
  useEffect(() => {
    fetchAllContacts()
      .then((data) => {
        setSelectedContact(data.find(contact => contact.ID == id));
        setSelectedContact({Name:"dfasdfasdfadsfadsfadsf"})
      })
      .catch((error) => {
        alert(error);
      });
  });
  if (typeof selectedContact === "undefined") {
    return (
      <div>
        <h1>
          Page not found... {id}
        </h1>
      </div>
    );
  }
  function handleChange(event) {
    let prop = event.target.id;
    // this.setState({ [prop]: event.target.value });
    // console.log(this.state);
  }
  function saveContact() {
    console.log("saving");
  }
  return (
    <div className="form-container">
      <form
        className="form"
        action="#"
        onSubmit={saveContact}
      >
        <div className="table">
          <div className="tr">
            <div className="td">Name :</div>
            <div className="td">
              <input
                type="text"
                className="name"
                id="Name"
                defaultValue={selectedContact.Name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              <span className="req">*</span>
            </div>
            <div id="nameError"></div>
          </div>
          <div className="tr">
            <div className="td">Email :</div>
            <div className="td">
              <input
                type="text"
                id="Email"
                value={selectedContact.Email}
                placeholder="Enter email address"
                className="email"
                onChange={handleChange}
              />
              <span className="req">*</span>
            </div>
            <div id="mailError"></div>
          </div>
          <div className="tr">
            <div className="td">Phone :</div>
            <div className="td">
              <input
                type="text"
                id="Phone"
                placeholder="Enter phone number"
                value={selectedContact.Phone}
                className="phone" onChange={handleChange}
              />
              <span className="req">*</span>
            </div>
            <div id="phoneError"></div>
          </div>
          <div className="tr">
            <div className="td">Landline :</div>
            <div className="td">
              <input
                type="text"
                id="Landline"
                placeholder="Enter landline number"
                className="landLine"
                value={selectedContact.Landline}
                onChange={handleChange}
              />
            </div>
            <div id="landLineError"></div>
          </div>
          <div className="tr">
            <div className="td">Website :</div>
            <div className="td">
              <input
                type="text"
                id="Url"
                placeholder="Enter website address"
                className="website"
                value={selectedContact.Url}
                onChange={handleChange}
              />
              <span className="req">*</span>
            </div>
            <div id="websiteError"></div>
          </div>
          <div className="tr">
            <div className="td">
              Address :
                  </div>
            <div className="td">
              <textarea
                rows="4"
                cols="22"
                id="Address"
                className="address"
                placeholder="Enter address"
                value={selectedContact.Address}
                onChange={handleChange}
              >
              </textarea>
            </div>
            <div id="addressError"></div>
          </div>
        </div>
        <button
          onClick={saveContact}
        >
          Save
          </button>
        <button
        >
          Cancel
          </button>
      </form>
    </div >
  );
}




// export class ContactForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       ID: (this.props.contact ? this.props.contact.ID : ''),
//       Name: (this.props.contact ? this.props.contact.Name : ''),
//       Email: (this.props.contact ? this.props.contact.Email : ''),
//       Phone: (this.props.contact ? this.props.contact.Phone : ''),
//       Landline: (this.props.contact ? (this.props.contact.Landline != null ? this.props.contact.Landline : '') : ''),
//       Url: (this.props.contact ? this.props.contact.Url : ''),
//       Address: (this.props.Address ? (this.props.contact.Address != null ? this.props.contact.Address : '') : ''),
//       updating: false
//     };
//     this.saveContact = this.saveContact.bind(this);
//     this.cancelAction = this.cancelAction.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }
//   componentDidUpdate() {
//     debugger;
//     if (!this.state.updating) {
//       this.setState({
//         ID: (this.props.contact ? this.props.contact.ID : ''),
//         Name: (this.props.contact ? this.props.contact.Name : ''),
//         Email: (this.props.contact ? this.props.contact.Email : ''),
//         Phone: (this.props.contact ? this.props.contact.Phone : ''),
//         Landline: (this.props.contact ? this.props.contact.Landline : ''),
//         Url: (this.props.contact ? this.props.contact.Url : ''),
//         Address: (this.props.Address ? this.props.contact.Address : ''),
//         updating: true
//       });
//     }
//   }
//   handleChange(event) {
//     let prop = event.target.id;
//     this.setState({ [prop]: event.target.value });
//     console.log(this.state);
//   }
//   saveContact() {
//     if (validateForm()) {
//       console.log(this.props.contact);
//       if (this.props.contact) {
//         var contact = {
//           ID: this.state.ID,
//           Name: this.state.Name,
//           Email: this.state.Email,
//           Phone: this.state.Phone,
//           Landline: this.state.Landline,
//           Url: this.state.Url,
//           Address: this.state.Landline
//         };
//       } else {
//         var contact = {
//           Name: this.state.Name,
//           Email: this.state.Email,
//           Phone: this.state.Phone,
//           Landline: this.state.Landline,
//           Url: this.state.Url,
//           Address: this.state.Landline
//         };
//       }
//       this.props.saveContact(contact);
//     }
//   }
//   cancelAction() {
//     this.props.cancelAction();
//   }
//   render() {
//     return (
//       <div className="form-container">
//         <form
//           className="form"
//           action="#"
//           onSubmit={this.saveContact}
//         >
//           <div className="table">
//             <div className="tr">
//               <div className="td">Name :</div>
//               <div className="td">
//                 <input
//                   type="text"
//                   className="name"
//                   id="Name"
//                   value={this.state.Name}
//                   onChange={this.handleChange}
//                   placeholder="Enter your name"
//                 />
//                 <span className="req">*</span>
//               </div>
//               <div id="nameError"></div>
//             </div>
//             <div className="tr">
//               <div className="td">Email :</div>
//               <div className="td">
//                 <input
//                   type="text"
//                   id="Email"
//                   value={this.state.Email}
//                   placeholder="Enter email address"
//                   className="email"
//                   onChange={this.handleChange}
//                 />
//                 <span className="req">*</span>
//               </div>
//               <div id="mailError"></div>
//             </div>
//             <div className="tr">
//               <div className="td">Phone :</div>
//               <div className="td">
//                 <input
//                   type="text"
//                   id="Phone"
//                   placeholder="Enter phone number"
//                   value={this.state.Phone}
//                   className="phone" onChange={this.handleChange}
//                 />
//                 <span className="req">*</span>
//               </div>
//               <div id="phoneError"></div>
//             </div>
//             <div className="tr">
//               <div className="td">Landline :</div>
//               <div className="td">
//                 <input
//                   type="text"
//                   id="Landline"
//                   placeholder="Enter landline number"
//                   className="landLine"
//                   value={this.state.Landline}
//                   onChange={this.handleChange}
//                 />
//               </div>
//               <div id="landLineError"></div>
//             </div>
//             <div className="tr">
//               <div className="td">Website :</div>
//               <div className="td">
//                 <input
//                   type="text"
//                   id="Url"
//                   placeholder="Enter website address"
//                   className="website"
//                   value={this.state.Url}
//                   onChange={this.handleChange}
//                 />
//                 <span className="req">*</span>
//               </div>
//               <div id="websiteError"></div>
//             </div>
//             <div className="tr">
//               <div className="td">
//                 Address :
//                   </div>
//               <div className="td">
//                 <textarea
//                   rows="4"
//                   cols="22"
//                   id="Address"
//                   className="address"
//                   placeholder="Enter address"
//                   value={this.state.Address}
//                   onChange={this.handleChange}
//                 >
//                 </textarea>
//               </div>
//               <div id="addressError"></div>
//             </div>
//           </div>
//           <button
//             onClick={this.saveContact}
//           >
//             Save
//           </button>
//           <button
//             onClick={this.cancelAction}
//           >
//             Cancel
//           </button>
//         </form>
//       </div>
//     );
//   }
// }
