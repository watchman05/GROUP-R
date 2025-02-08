import { useEffect, useState } from 'react';
import NotesList from './Components/NotesList';
import {v4 as uuidv4} from 'uuid'
import Search from './Components/Search';
import Header from './Components/Header';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './Components/auth/SignUp';
import Login from './Components/auth/Login';
import ForgotPassword from './Components/auth/ForgotPassword';
import { Toaster } from 'react-hot-toast';
import Navbar from './Components/Navbar';

function App() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]); // New state for filtered notes
  const [darkMode, setDarkMode] = useState(false);

  // Add a new note
  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: uuidv4(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    setFilteredNotes(newNotes); // Update filteredNotes as well
  };

  // Delete a note
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    setFilteredNotes(newNotes); // Update filteredNotes
  };

  // Update a note (New functionality)
  const updateNote = (id, updatedText) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, text: updatedText } : note
    );
    setNotes(updatedNotes);
    setFilteredNotes(updatedNotes); // Ensure filtered notes are updated
  };

  // Search for notes (Fixing issue)
  const searchForText = (searchNote) => {
    if (searchNote.trim() === "") {
      setFilteredNotes(notes); // Reset to all notes when search is cleared
    } else {
      const filtered = notes.filter((note) =>
        note.text.toLowerCase().includes(searchNote.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  };

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app"));
    if (savedNotes) {
      setNotes(savedNotes);
      setFilteredNotes(savedNotes); // Sync filteredNotes
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("react-notes-app", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className={`${darkMode && "dark-mode"} `}>
      <Toaster/>
      <Routes>
        <Route
          path="/notes"
          element={
            <div className="container">
              <Navbar/>
              <Header handleToggleDarkMode={setDarkMode} />
              <Search handleSearchNote={searchForText} />
              <NotesList
                notes={filteredNotes} // Use filteredNotes instead of notes
                handleAddNote={addNote}
                handleDeleteNote={deleteNote}
                handleUpdateNote={updateNote} // Pass updateNote function
              />
            </div>
          }
        />
        <Route path="/" element={<Navigate to="/auth/signup" />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path='/auth/forgotpassword' element={<ForgotPassword/>}/>
      </Routes>
    </div>
  );
}

export default App;