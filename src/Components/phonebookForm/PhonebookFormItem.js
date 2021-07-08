import React, { useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { PhonebookItemStyled } from "./PhonebookFormItemStyled";
import { useDispatch, useSelector } from "react-redux";
import { contactSave } from "../../redux/contacts/contacts-operations";

const InitialState = {
  name: "",
  number: "",
};

export default function PhonebookFormItem() {
  const dispatch = useDispatch();
  const [state, setState] = useState(InitialState);
  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setState({ ...state, [name]: value });
  };

  const nameInputId = uuidv4();
  const numberInputId = uuidv4();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(contactSave(state));
    setState(InitialState);
  };

  // const reset = () => {
  //   useState({ name: "", number: "" });
  // };
  // state = {
  //   name: "",
  //   number: "",
  // };

  // handleNameChange = (evt) => {
  //   const { name, value } = evt.currentTarget;
  //   this.setState({ [name]: value });
  //   const nameValue = this.setState({ [name]: value });

  //   return nameValue;
  // };

  // handleSubmit = (evt) => {
  //   evt.preventDefault();

  //   this.props.onSubmit(this.state);

  //   this.reset();
  // };

  // reset = () => {
  //   this.setState({ name: "", number: "" });
  // };

  return (
    <div className="phonebook-container">
      <h2 className="phonebook-title">Phonebook</h2>
      <PhonebookItemStyled
        action=""
        className="form-input"
        onSubmit={handleSubmit}
      >
        <label className="phonebook-name">
          Name
          <br />
          <input
            onChange={handleChange}
            value={state.name}
            className="input"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="phonebook-filter"
            required
            id={nameInputId}
          />
        </label>

        <label className="phonebook-number">
          Number
          <br />
          <input
            onChange={handleChange}
            value={state.number}
            className="input"
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            id={numberInputId}
          />
        </label>

        <button type="submit" className="add-contact-btn">
          Add contact
        </button>
      </PhonebookItemStyled>
    </div>
  );
}

// const mapDispatchToProps = (dispatch) => ({
//   onSubmit: (contact) => dispatch(contactSave(contact)),
// });

// export default connect(null, mapDispatchToProps)(PhonebookFormItem);

PhonebookFormItem.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  onSubmit: PropTypes.func.isRequired,
};
