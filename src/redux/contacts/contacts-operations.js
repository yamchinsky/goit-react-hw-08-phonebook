import axios from "axios";

import {
  contactSaveRequest,
  contactSaveSuccess,
  contactSaveError,
  contactRemoveRequest,
  contactRemoveSuccess,
  contactRemoveError,
  fetchRequest,
  fetchSuccess,
} from "../../redux/contacts/contacts-actions";
axios.defaults.baseURL = "https://connections-api.herokuapp.com";

// Отображение имени и телефона, после ввода данных в инпут
// export const formSubmithandler = (data) => {
//   const { contacts } = this.state;
//   const dublicateContact = contacts.find(
//     (contact) => contact.name.toLowerCase() === data.name.toLowerCase()
//   );

//   if (dublicateContact) {
//     alert(`${dublicateContact.name} is already in contacts!`);
//     return;
//   }
//   const newContact = { name: data.name, number: data.number, id: uuidv4() };
//   this.setState((preState) => {
//     return { contacts: [...preState.contacts, newContact] };
//   });
// };

export const fetchContacts = () => async (dispatch) => {
  dispatch(fetchRequest());

  try {
    const { data } = await axios.get("/contacts");
    dispatch(fetchSuccess(data));
  } catch (error) {}
  // axios
  //   .get("/contacts")
  //   .then(({ data }) => dispatch(fetchSuccess(data)))
  //   .catch((error) => dispatch(fetchError(error)));
};

export const contactSave = (contact) => (dispatch) => {
  dispatch(contactSaveRequest());
  axios
    .post("./contacts", contact)
    .then(({ data }) => {
      dispatch(contactSaveSuccess(data));
    })
    .catch((error) => dispatch(contactSaveError(error)));
};

export const contactRemove = (contactId) => (dispatch) => {
  dispatch(contactRemoveRequest());
  axios
    .delete(`/contacts/${contactId}`)
    .then(() => dispatch(contactRemoveSuccess(contactId)))
    .catch((error) => dispatch(contactRemoveError(error)));
};

export default {
  contactSave,
  contactRemove,
  fetchContacts,
};
