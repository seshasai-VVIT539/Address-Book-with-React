var fetchUrl = 'https://localhost:44325/api/contacts/';
export function updateContact(contact) {
  return fetch(fetchUrl + contact.ID, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact)
    })
    .then(response => {
      return response.ok;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export function addContact(contact) {
  return fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact)
    })
    .then(response => {
      return response.ok;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export function fetchAllContacts() {
  return fetch(fetchUrl)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch((error) => {
      console.log(error)
    });
}

export function deleteContact(viewingContact) {
  console.log("deleting");
  console.log(viewingContact);
  return fetch(fetchUrl + viewingContact.ID, {
      method: "DELETE"
    })
    .then(response => {
      return response.ok;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
