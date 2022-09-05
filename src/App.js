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
        <Route path="/student" element={<StudentList />} />
        <Route path="/student/add" element={<AddStudent />} />
        <Route path="/student/edit" element={<EditStudent />} />
      </Routes>
    </>
  );
}

export default App;
