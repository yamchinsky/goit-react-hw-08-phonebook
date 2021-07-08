import React from "react";
import PropTypes from "prop-types";
import { ContactsItemStyled } from "./ContactsItemStyled";
import { useSelector, useDispatch } from "react-redux";
import { contactRemove } from "../../redux/contacts/contacts-operations";
import contactsSelectors from "../../redux/contacts/contacts-selectors";

function ContactsItem({ name, number, onClickRemove }) {
  return (
    <li className="contacts-item">
      <p>
        {name}: {number}
      </p>
      <button type="button" className="delete-button" onClick={onClickRemove}>
        Delete
      </button>
    </li>
  );
}

export default function ContactsList() {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getVisibleContacts);

  const onRemove = (id) => dispatch(contactRemove(id));
  return (
    contacts.length > 0 && (
      <ContactsItemStyled>
        {contacts.map(({ id, name, number }) => (
          <ContactsItem
            key={id}
            name={name}
            number={number}
            onClickRemove={() => onRemove(id)}
          />
        ))}
      </ContactsItemStyled>
    )
  );
}

ContactsItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onClickRemove: PropTypes.func.isRequired,
};

ContactsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onRemove: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   contacts: contactsSelectors.getVisibleContacts(state),
// });

// const mapDispatchToProps = (dispatch) => ({
//   onRemove: (contactId) => dispatch(contactRemove(contactId)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
