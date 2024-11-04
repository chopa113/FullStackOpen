import { useState } from 'react'

const Person = ({ person }) => {
  return <p>{person.name}</p>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      debug: {newName}
      <h2>Numbers</h2>
      {persons.map(person => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  )
}

export default App