import {
  useState,
  useEffect
} from "react";
import {
  Link,
  useHistory,
  useParams
} from "react-router-dom";
import {
  fetchAllContacts, getContactWithId,
} from "../Services/ContactServices";

export function ShowContact(props) {
  let { id } = useParams();
  const history = useHistory();
  const [selectedContact, setSelectedContact] = useState({ undefined });
  const toEdit = "/contacts/form/" + id;
  useEffect(() => {
    getContactWithId(id)
      .then((data) => {
        if (data) {
          setSelectedContact(data);
        } else {
          history.push("/contacts/");
        }
      })
      .catch((error) => {
        alert(error);
      });
  });
  if (Object.keys(selectedContact).length == 0) {
    return (
      <div>
        <h1>
          Page not found... {id}
        </h1>
      </div>
    );
  }
  return (
    <div className="view-details">
      <div className="details-header">
        <div className="details-heading name">
          {selectedContact.Name}
        </div>
        <div className="options">
          <Link to={toEdit}>
            <button
              className="option"
            >
              <i className="fa fa-edit"></i> Edit
                  </button>
          </Link>
          <button
            className="option"
            onClick={() => props.deleteContact()}
          >
            <i className="fa fa-trash"></i> Delete
                </button>
        </div>
      </div>
      <div className="details">
        <div className="table">
          <div className="tr">
            <div className="td">Email</div>
            <div className="td email">{selectedContact.Email}</div>
          </div>
          <div className="tr">
            <div className="td">Phone</div>
            <div className="td phone">{selectedContact.Phone}</div>
          </div>
          <div className="tr">
            <div className="td">Landline</div>
            <div className="td landLine">{selectedContact.Landline}</div>
          </div>
          <div className="tr">
            <div className="td">Website</div>
            <div className="td website">{selectedContact.Url}</div>
          </div>
          <div className="tr">
            <div className="td">Address</div>
            <div className="td address">{selectedContact.Address}</div>
          </div>
        </div>
      </div>
    </div>
  );

}




// export class ShowContact extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       contactsList: undefined
//     };
//   }
//   componentDidMount() {
//     console.log("fetching");
//     fetchAllContacts()
//       .then((data) => {
//         console.log(data);
//         this.setState({ contactsList: data });
//         console.log(data);
//       })
//       .catch((error) => {
//         alert(error);
//       });
//   }
//   render() {
//     const toEdit = "/contacts/form/" + this.props.contact.ID;
//     return (
//       <div className="view-details">
//         {useParams()}
//         <div className="details-header">
//           <div className="details-heading name">
//             {this.props.contact.Name}
//           </div>
//           <div className="options">
//             <Link to={toEdit}>
//               <button
//                 className="option"
//                 onClick={() => { this.props.handleEdit() }}
//               >
//                 <i className="fa fa-edit"></i> Edit
//               </button>
//             </Link>
//             <button
//               className="option"
//               onClick={() => this.props.deleteContact()}
//             >
//               <i className="fa fa-trash"></i> Delete
//             </button>
//           </div>
//         </div>
//         <div className="details">
//           <div className="table">
//             <div className="tr">
//               <div className="td">Email</div>
//               <div className="td email">{this.props.contact.Email}</div>
//             </div>
//             <div className="tr">
//               <div className="td">Phone</div>
//               <div className="td phone">{this.props.contact.Phone}</div>
//             </div>
//             <div className="tr">
//               <div className="td">Landline</div>
//               <div className="td landLine">{this.props.contact.Landline}</div>
//             </div>
//             <div className="tr">
//               <div className="td">Website</div>
//               <div className="td website">{this.props.contact.Url}</div>
//             </div>
//             <div className="tr">
//               <div className="td">Address</div>
//               <div className="td address">{this.props.contact.Address}</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
