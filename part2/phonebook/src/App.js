import { useState } from 'react'

const Filter = ({ filter, handler }) => (
  <div>
    Filter shown with <input value={filter} onChange={handler} />
  </div>  
)

const PersonsForm = ({ submitHandler, nameValue, nameHandler, numberValue, numberHandler }) => (
  <div>
      <form onSubmit={submitHandler}>
        <div>
          Name: <input value={nameValue} onChange={nameHandler} />
        </div>
        <div>
          Number: <input value={numberValue} onChange={numberHandler} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
    </form>
  </div>
)

const Persons = ({ persons }) => (
  <div>
    {persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    const personNames = persons.map(person => person.name)
    if (personNames.indexOf(newName) === -1) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const showNumbers = persons.filter(person => !(person.name.toLowerCase().indexOf(filter) === -1))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handler={handleFilterChange} />

      <h3>Add a new number</h3>
      
      <PersonsForm submitHandler={addNumber} 
                   numberValue={newNumber} numberHandler={handleNumberChange} 
                   nameValue={newName} nameHandler={handleNameChange}
                   />

      <h3>Numbers</h3>

      <Persons persons={showNumbers} />
    </div>
  )
}

export default App