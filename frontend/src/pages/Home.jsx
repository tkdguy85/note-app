import { useState, useEffect } from 'react'
import api from '../api'
import Note from '../components/Note'
import '../styles/Home.css'

function Home(){
  const [notes, setNotes] = useState([])
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")

  useEffect(() => {
    getNotes()
  }, [])
  
  // Note Logic
  const getNotes = () => {
    api
      .get('api/notes/')
      .then((res) => res.data)
      .then((data) => {setNotes(data); console.log(data)})
      .catch((err) => alert(err))
  }

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`).then((res) => {
        if (res.status === 204) alert('Note removed.')
        else alert('Failed to remove note!')
        // Lazily rerender notes
        getNotes()
      })
      .catch((error) => alert(error))
  }

  const createNote = (e) => {
    e.preventDefault()
    api
      .post('/api/notes/', {content, title})
      .then((res) => {
        if (res.status === 201) alert('Note created.')
        else alert('Failed to create note!')
        // Lazily rerender notes
        getNotes()
      })
      .catch((error) => alert(error))
  }

  return (
    <div>
      <div>
        {notes.map(
          (note) => <Note 
            note={note} 
            onDelete={deleteNote}
            key={note.id}  
          />
        )}

      </div>
      <form 
        onSubmit={createNote}
      >
        {/* Title */}
        <label htmlFor='title'>Title:</label>
        <br/>
        <input 
          type='text'
          id='title'
          name='title'
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        {/* Content */}
        <label htmlFor='content'>Content:</label>
        <br/>
        <textarea 
          type='text'
          id='content'
          name='content'
          required
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <br/>
        {/* Submit */}
        <input 
          type='submit' 
          value='submit'      
        />
      </form>
    </div>
  ) 
}

export default Home