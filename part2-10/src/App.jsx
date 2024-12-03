import { useState, useEffect } from 'react';
import axios from 'axios';

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
          <button name="delete" onClick={() => handleClick(person)}>delete</button>
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newName = e.target.elements.name.value;
    const newNumber = e.target.elements.number.value;
    if (persons.some((person) => person.name === newName) || persons.some((person) => person.number === newNumber)) {
      if(persons.some((person) => person.name === newName && person.number === newNumber)){
        alert(`${newName} is already added to phonebook`);
      }
      else{
        if(confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          const person = persons.find(p => p.name === newName);
          const updatedPerson = { ...person, number: newNumber };
          const response = await axios.put(`http://localhost:3001/persons/${person.id}`, updatedPerson);
          setPersons(persons.map(p => p.id !== person.id ? p : response.data));
        }
      }
    }else{
      const response = await axios.post('http://localhost:3001/persons', { name: newName, number: newNumber });
      console.log(response.data);
      setPersons(persons.concat(response.data));
    }
    
    

  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDelete = (person) => {
    if(confirm("Delete " + person.name + "?")){
      axios.delete(`http://localhost:3001/persons/${person.id}`);
      setPersons(persons.filter(p => p.id !== person.id));
    }else{
      return;
    }
    
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>add a new</h3>

      <PersonForm handleSubmit={handleSubmit} />

      <Persons persons={filteredPersons} handleClick={handleDelete} />
    </div>
  );
};

export default App;
