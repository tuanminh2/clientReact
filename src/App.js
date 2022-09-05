import './App.scss';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Calendar from './components/Calendar/Calendar';
import StudentList from './components/StudentList/StudentList';

import EditStudent from './components/EditStudent/EditStudent';
import AddStudent from './components/AddStudent/AddStudent';

function App() {
  // Instantiation

  return (
    <>
     
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="add" element={<AddStudent />} />
        <Route path="edit" element={<EditStudent />} />
      </Routes>
    </>
  );
}

export default App;
