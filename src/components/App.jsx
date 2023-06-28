import { useEffect, useState } from 'react';
import PropType from 'prop-types';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import css from './App.module.css';

const LS_KEY = 'contacts';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const parseContacts = JSON.parse(localStorage.getItem(LS_KEY));
    if (parseContacts) {
      setContacts(parseContacts);
    }
  }, []);

  useEffect(() => {
    // contacts.length !== 0 &&
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const handleAddContact = newContact => {
    const arrayOfNames = contacts.map(contact => contact.name.toLowerCase());
    const ifAbonentExist = arrayOfNames.find(
      name => newContact.name.toLowerCase() === name
    );
    if (ifAbonentExist) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    setContacts([...contacts, newContact]);
    setFilter('');
  };

  const handleDeleteContact = id => {
    setContacts(prev => {
      return prev.filter(contact => contact.id !== id);
    });
  };

  const handleFilterAbonent = () => {
    return contacts.filter(({ name }) => {
      const abonentName = name.toLowerCase();
      const abonentFilter = filter.toLowerCase();
      return abonentName.includes(abonentFilter);
    });
  };

  return (
    <div className={css.container}>
      <h1>Phone book</h1>
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <ContactList
        contacts={filter ? handleFilterAbonent() : contacts}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
}

App.propTypes = {
  contacts: PropType.arrayOf(
    PropType.shape({
      id: PropType.string.isRequired,
      name: PropType.string.isRequired,
      number: PropType.string.isRequired,
    })
  ),
};
