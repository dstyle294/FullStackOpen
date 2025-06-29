import Note from './components/Note'
import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'



const App = () => {
  const [notes, setNotes] = useState(null) // if you want to start with empty list, do useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])  // if the second parameter is [], the effect is only run after  the first render of the component

  if (!notes) {
    return null
  }

  const addNote = event => {
    event.preventDefault() // default action is causing the page to reload
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5, // 50% of chance of being important
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })// when you use the HTTP POST method, it does creating IDs for you
      // check Network for details on requests, etc.
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value) // no default action here
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true) // == doesnt always work, but === always does
  
  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`)
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id) // basically a linear search
    const changedNote = { ...note, important: !note.important }

    // have to make a copy of the note and set it as we must never mutate state directly in React
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(error => {
        setErrorMessage(
          `Note ${note.content} was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
       // shallow copy as no 'new' objects created
    // note if false (the old note itself), else the returned response
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}> 
          show {showAll ? 'important': 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)} 
          />
        )} 
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange} 
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

// the code 'notes.map' is in {} as its written in JavaScript

// map always creates a new array, the elements of which have been created 
// from the elements of the original array by mapping: using the function
// given as a parameter to the map method.



export default App