import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'




const Filter = ({newSearch, handleSearchChange, persons}) => {

  
  return (<form>
    <div>
      filter shown with <input value={newSearch} onChange={handleSearchChange}/>
    </div>
  </form>)
}

const PersonForm = ({onSubmit, onNameChange, newName, newNumber, onNumberChange}) => {
  return (
  <form onSubmit = {onSubmit}>
    <div>
      debug: {newName}
    </div>
    <div>
      name: <input value={newName} onChange = {onNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange = {onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>)
}

const Person = ({ person, handleDelete }) => {
  console.log(person)
    return (
      <div>
        {person.name} {person.number} <button onClick={() => handleDelete(person, person.id)}>delete</button>

      </div>
    )
  }     

  const Persons = ({searching, persons, newSearch, handleDelete}) => {

    const personsShow = persons.filter(
      (person) => {
        console.log(person)
        if (person.name.toLowerCase().includes(newSearch) === true) return person
      }
    )
    console.log(handleDelete)
    return (<div>
      {personsShow.map((person) => <Person key = {person.id} person = {person} handleDelete={handleDelete}/>)}
      </div>)
  }

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [searching, setSearching] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [allOk, setAllOk] = useState(true)

  
  useEffect(() => {
    personService 
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])

  console.log('render', persons.length, 'persons')

  const handleDelete = (person, id) => {
    console.log(person, id)
    if (window.confirm(`Delete ${person.name}?`)){
      personService.deleteEntry(id)
      .then(response => {
        const updatedPersons = persons.filter(person => person.id !== id)
        setPersons(updatedPersons)
      })
    }
  }
  

  const handleSearchChange = (event) => {
      console.log(event.target.value, "target")
      const searchVal = event.target.value.toLowerCase()
      setNewSearch(event.target.value)
      
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const names = persons.map(
      (person) => person.name
    )

    const numbers = persons.map(
      (person) => person.number
    )
    
    if (names.includes(newName) === true) {
      alert(`${newName} is already added to phonebook`)
      if (numbers.includes(newNumber) !== true) {
        // new number
        if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const oldPerson = persons.find(person => person.name === newName)
          console.log(oldPerson)
          const newPerson = {...oldPerson, number: newNumber}
          console.log(newPerson)
          personService
            .update(newPerson.id, newPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))

              setErrorMessage(`Changed ${newName}'s phone number to ${newNumber}`)

              setAllOk(true)

              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)

            })
            .catch(
              error => {
                setAllOk(false)
                setErrorMessage(error.response.data.error)
              }
            )
          
        }
      }
    }
    else {
      const personObject = {name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setErrorMessage(`Added ${newName}`)
            setAllOk(true)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
        })
        .catch(error => {
          console.log(error.response.data.error)
          setErrorMessage(error.response.data.error)
          setAllOk(false)
          setTimeout(() => {
              setErrorMessage(null)
          }, 5000)
        })
    
    }
  }

  
  

  console.log(errorMessage)
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} allOk={allOk} />
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} persons={persons}/>
      
      <h2>Add a new</h2>
      <PersonForm 
        onSubmit={addName}
        onNameChange={handleNameChange}
        newName={newName}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />
      
      <h2>Numbers</h2> 
      <Persons searching = {searching} persons={persons} newSearch={newSearch} handleDelete={handleDelete}/>
    </div>
  )
}

export default App