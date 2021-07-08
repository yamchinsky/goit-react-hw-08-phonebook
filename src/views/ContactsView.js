import React, { useEffect } from "react";
import PhonebookFormItem from "../Components/phonebookForm/PhonebookFormItem";

import FilterItem from "../Components/filter/FilterItem";
import ContactsList from "../Components/contacts/ContactsItem";

import contactsOperations from "../redux/contacts/contacts-operations";
import { useDispatch, useSelector } from "react-redux";
import contactsSelectors from "../redux/contacts/contacts-selectors";

export default function ContactsView() {
  const dispatch = useDispatch();
  const isLoadingContacts = useSelector(contactsSelectors.getLoading);
  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);
  // componentDidMount() {
  //   this.props.fetchContacts();
  // }

  return (
    <div>
      <PhonebookFormItem />
      <h2 className="contacts-title">Contacts</h2>
      <FilterItem />
      <ContactsList />
      {isLoadingContacts && <h1>Загружаем</h1>}
    </div>
  );
}

// const mapStateToProps = (state) => ({
//   isLoadingContacts: contactsSelectors.getLoading(state),
// });

// const mapDispatchToProps = (dispatch) => ({
//   fetchContacts: () => dispatch(contactsOperations.fetchContacts()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ContactsView);
