import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import NotesPage from "./NotesPage";
import RegisterForm from "./RegisterForm";
import Navigation from "./Navigation";

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/register" element={<RegisterForm />} />
          {/* Ruta para NotesPage */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
