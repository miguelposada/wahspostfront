import React, { useState, useEffect } from "react";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    // Aquí puedes realizar una solicitud al servidor para obtener la lista de notas.
    // Puedes usar el token de autenticación almacenado en localStorage para la autenticación.
    // Ejemplo ficticio:
    // axios.get('http://localhost:3000/notes', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    //   .then((response) => {
    //     setNotes(response.data);
    //   })
    //   .catch((error) => {
    //     // Manejar errores de solicitud, como la falta de autorización.
    //   });
  }, []);

  const handleAddNote = () => {
    // Aquí puedes realizar una solicitud al servidor para agregar una nueva nota.
    // Puedes usar el token de autenticación almacenado en localStorage para la autenticación.
    // Ejemplo ficticio:
    // axios.post('http://localhost:3000/notes', { content: newNote }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    //   .then((response) => {
    //     // Actualizar la lista de notas después de agregar una nueva.
    //     setNotes([...notes, response.data]);
    //     setNewNote(''); // Limpiar el campo de nueva nota.
    //   })
    //   .catch((error) => {
    //     // Manejar errores de solicitud, como la falta de autorización o errores de validación.
    //   });
  };

  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a new note"
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
    </div>
  );
}

export default NotesPage;
