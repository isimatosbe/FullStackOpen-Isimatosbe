import { useState, useEffect } from 'react'
import comms from './components/Communications'
import './index.css'

const Notification = ({ message, className }) => {
  if (message === null) {
    return
  }
  else {
    return (
      <div className={className}>
        {message}
      </div>
    )
  }
}

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

const Persons = ({ persons, handlerDelete }) => (
  <div>
    {persons.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={() => handlerDelete(person)}>Delete</button></p>)}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null) 
  const [errorClassName, setErrorClassName] = useState('')

  useEffect(() => {
    comms
      .fetchData()
      .then(response => {
        setPersons(response)
      })
    }, [])

  const addNumber = (event) => {
    event.preventDefault()
    const personNames = persons.map(person => person.name)
    if (personNames.indexOf(newName) === -1) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.map(person => person.id)[persons.length - 1] + 1
      }
      
      comms
        .newData(personObject)
        .then(() => {
          setPersons(persons.concat(personObject))
          setErrorClassName('message')
          setErrorMessage(`Added ${newName}`)
          })
        .catch(error => {
          setErrorClassName('error')
          console.log(error.response.data.error)
          setErrorMessage(error.response.data.error)
          })
      setTimeout(() => {
        setErrorMessage(null)
      }, 2500)

      setNewName('')
      setNewNumber('')
    }
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        const personObject = {
          name: newName,
          number: newNumber,
          id: persons.filter(person => person.name === newName)[0].id
        }
        
        comms.updateData(personObject)
          .then(() => {
            setPersons(persons.filter(person => !(person.name === newName)).concat(personObject))
            setErrorClassName('message')
            setErrorMessage(`${newName}'s number updated to ${newNumber}`)
          })
          .catch(error => {
            setErrorClassName('error')
            console.log(error.response.data.message)
            setErrorMessage(error.response.data.message)
          })
          

        setTimeout(() => {
          setErrorMessage(null)
        }, 2500)

        setNewName('')
        setNewNumber('')
      }
    }
  }

  const removeNumber = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      comms
        .deleteData(person.id)
        .then(() => {
          setPersons(persons.filter(pers => !(pers.name === person.name)))
        })
        .catch(() => {
          setErrorClassName('error')
          setErrorMessage(`Information of ${person.name} has already been removed from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 2500)
        })
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

  const showNumbers = persons.filter(person => !(person.name.toLowerCase().indexOf(filter.toLowerCase()) === -1))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} className={errorClassName} />

      <Filter filter={filter} handler={handleFilterChange} />

      <h3>Add a new number</h3>
      
      <PersonsForm submitHandler={addNumber} 
                   numberValue={newNumber} numberHandler={handleNumberChange} 
                   nameValue={newName} nameHandler={handleNameChange}
                   />

      <h3>Numbers</h3>

      <Persons persons={showNumbers} handlerDelete={removeNumber} />
    </div>
  )
}

export default App