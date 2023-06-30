import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import About from './components/About';
import EmpPersonalDetailsForm from './components/EmpPersonalDetailsForm';
import Login from './components/Login';
import Navbar from './components/Navbar';
import EmployeeSearchTable from './components/EmployeeSearchTable';
import './Navbar.css';
import './EmpDetailsForm.css'
import './EmployeeSearchTable.css'
import EmpProjectDetailsForm from './components/EmpProjectDetailsForm';
import EmpSkillsCertificationForm from './components/EmpSkillsCertificationForm';
import Display from './redux/Display';



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<EmpPersonalDetailsForm />} />
        <Route path="/emp-project-details" element={<EmpProjectDetailsForm />} />
        <Route path="/emp-certificates-skills-form" element={<EmpSkillsCertificationForm/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resume.html" element={<resume />} />
        <Route path="/hrview" element={<EmployeeSearchTable />} />
        <Route path="/display" element={<Display />}   />
        </Routes>
    </>
  );
}

export default App;
