import React, { useState, useEffect } from "react";
import axios from "axios";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [error, setError] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const getAuthInfo = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    return { token, userId };
  };

  useEffect(() => {
    const { token, userId } = getAuthInfo();

    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:3000/notes/user/${userId}/notes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setNotes(response.data);
      } catch (error) {
        console.error("Error getting User Notes from DB:", error);
        setError(`Error getting User Notes. ${error}`);
      }
    }
    fetchData();
  }, []);

  const handleAddNote = () => {
    const { token, userId } = getAuthInfo();
    if (!newNoteTitle || !newNoteContent) {
      setError("Both Title and Description are required.");
      return;
    }
    axios
      .post(
        "http://localhost:3000/notes",
        { title: newNoteTitle, content: newNoteContent, userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setNotes([...notes, response.data]);
        setNewNoteTitle("");
        setNewNoteContent("");
      })
      .catch((error) => {
        console.error("Error adding the note:", error);
      });
  };

  const startEditing = (note) => {
    setEditingNote(note);
    setEditedTitle(note.title);
    setEditedContent(note.content);
  };

  const saveChanges = (noteId, updatedTitle, updatedContent) => {
    const { token } = getAuthInfo();
    console.log(noteId);
    if (!updatedTitle || !updatedContent) {
      setError("Both Title and Description are required.");
      return;
    }
    axios
      .put(
        `http://localhost:3000/notes/${noteId}`,
        { title: updatedTitle, content: updatedContent },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const updatedNotes = notes.map((note) =>
          note._id === noteId ? response.data : note
        );
        setNotes(updatedNotes);
        setEditingNote(null);
        setError("");
      })
      .catch((error) => {
        console.error("Error editing the note:", error);
        setError(`Error editing the note. ${error}`);
      });
  };

  const handleDeleteNote = (noteId) => {
    const { token } = getAuthInfo();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmDelete) {
      return;
    }
    axios
      .delete(`http://localhost:3000/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        const updatedNotes = notes.filter((note) => note._id !== noteId);
        setNotes(updatedNotes);
      })
      .catch((error) => {
        console.error("Error deleting the note:", error);
        setError(`Error deleting the note. ${error}`);
      });
  };

  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            {editingNote === note ? (
              <form>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <button
                  onClick={() =>
                    saveChanges(note._id, editedTitle, editedContent)
                  }
                >
                  Save
                </button>
              </form>
            ) : (
              <>
                <strong>{note.title}:</strong> {note.content}
                <button onClick={() => startEditing(note)}>Edit</button>
                <button onClick={() => handleDeleteNote(note._id)}>
                  Delete
                </button>{" "}
                {/* Botón de eliminación */}
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
          placeholder="Add a new Note Title"
        />
        <input
          type="text"
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
          placeholder="Note Content"
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}

export default NotesPage;
