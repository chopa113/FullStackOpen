import { useState, useEffect } from 'react';

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with{' '}
      <input type="text" value={filter} onChange={handleFilterChange} />
    </div>
  );
};

const PersonForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input type="text" name="name" />
      </div>
      <div>
        number: <input type="text" name="number" />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, handleClick }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button name="delete" onClick={handleClick()}>delete</button>
        </p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/persons')
      .then((response) => response.json())
      .then((data) => setPersons(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newName = e.target.elements.name.value;
    const newNumber = e.target.elements.number.value;
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([
        ...persons,
        { name: newName, number: newNumber, id: persons.length + 1 },
      ]);
      e.target.elements.name.value = '';
      e.target.elements.number.value = '';
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDelete = (id) => {
    setPersons(persons.filter((person) => person.id !== id));
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm handleSubmit={handleSubmit} />

      <Persons persons={filteredPersons} />

    </div>
  );
};

export default App;
