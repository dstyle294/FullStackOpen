import { useState } from 'react'

const Person = (person) => {
  return (
    <div>
      {person.person.name} {person.person.number}
    </div>
  )
}

const Persons = ({personsToShow, searching, persons}) => {
  return (searching ? (<div>
      {personsToShow.map((person) => <Person key = {person.id} person = {person}/>)}
    </div>): (<div>
      {persons.map((person) => <Person key = {person.id} person = {person}/>)}
    </div>))
}

const Filter = ({newSearch, handleSearchChange}) => {
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


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [searching, setSearching] = useState(false)
  const [personsToShow, setPersonsToShow] = useState(persons)

  
  
  

  const handleSearchChange = (event) => {
      console.log(event.target.value, "target")
      const searchVal = event.target.value.toLowerCase()
      setNewSearch(event.target.value)
      setSearching(true)
      setPersonsToShow(persons.filter(
        (person) => {
          console.log(person.name.toLowerCase().includes(searchVal))
          if (person.name.toLowerCase().includes(searchVal) === true) return person
        }
      ))
      console.log(personsToShow, "showing")
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
    if (names.includes(newName) === true) alert(`${newName} is already added to phonebook`)
    else {
      const personObject = {name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }
  

  
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange}/>
      
      <h2>Add a new</h2>
      <PersonForm 
        onSubmit={addName}
        onNameChange={handleNameChange}
        newName={newName}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2> 
      <Persons personsToShow = {personsToShow} searching = {searching} persons={persons}/>
    </div>
  )
}

export default App