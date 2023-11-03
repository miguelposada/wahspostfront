import React, { useState, useEffect } from "react";
import axios from "axios";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setNotes(response.data);
      } catch (error) {
        console.error("Error al recuperar las notas:", error);
        setError(`Error geeting User Notes. ${error}`);
      }
    }
    fetchData();
  }, []);

  const handleAddNote = () => {
    axios
      .post(
        "http://localhost:3000/notes",
        { content: newNote },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        setNotes([...notes, response.data]);
        setNewNote("");
      })
      .catch((error) => {});
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
      {error && <p>{error}</p>}
    </div>
  );
}

export default NotesPage;
