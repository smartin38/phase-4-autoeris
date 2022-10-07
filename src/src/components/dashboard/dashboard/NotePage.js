import React from 'react'
import { useState, useEffect } from 'react'
import NoteList from './NoteList'
import NewNoteForm from './NewNoteForm'


export default function RoutinePage() {

  const [newNotes, setNewNotes] = useState([])
  const [notes, setNotes] = useState([])
  const [render, reRender] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:3000/notes`)
        .then(res => res.json())
        .then(data => {
            setNotes(data)
        })
}, [render])


  function handleSavedDelete(id) {
    const newNotes = notes.filter((note) => note.id !== id)
    setNewNotes(newNotes)
}





  return (
    <div>
      <NoteList reRender={reRender} handleSavedDelete={handleSavedDelete} savedProducts={newNotes} />
      
      
    </div>
  )
}