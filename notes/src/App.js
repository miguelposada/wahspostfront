import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import NotesPage from "./NotesPage"; // Asegúrate de importar NotesPage

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/notes" element={<NotesPage />} />{" "}
          {/* Ruta para NotesPage */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
