// src/App.js
import React from 'react';
import StudentForm from './component/studentform'; // Correct: No curly braces
import './App.css';

function App() {
  return (
    <div className="App">
       <StudentForm />
    </div>
  );
}

export default App;