import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import About from './components/About';
import EmpPersonalDetailsForm from './components/EmpPersonalDetailsForm';
import Login from './components/LoginPage';
import Navbar from './components/Navbar';
import EmployeeSearchTable from './components/EmployeeSearchTable';
import './Navbar.css';
import './EmpDetailsForm.css';
import './EmployeeSearchTable.css';
import EmpProjectDetailsForm from './components/EmpProjectDetailsForm';
import EmpSkillsCertificationForm from './components/EmpSkillsCertificationForm';
import Display from './redux/Display';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (username, password) => {
    try {
      // Send a request to the server to validate the credentials
      const response = await axios.post('/api/login', { username, password });

      // Assuming the server response contains a success flag
      if (response.data.success) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        // Display an error message to the user
      }
    } catch (error) {
      console.log('Login error:', error);
      setIsLoggedIn(false);
      // Display an error message to the user
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Perform any logout logic or actions
    // For example, clear user data from local storage, reset state, or redirect to the login page
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<EmpPersonalDetailsForm />} />
        <Route path="/emp-project-details" element={<EmpProjectDetailsForm />} />
        <Route path="/emp-certificates-skills-form" element={<EmpSkillsCertificationForm />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/hrview" /> : <Login handleLogin={handleLogin} />}
        />
        <Route
          path="/hrview"
          element={isLoggedIn ? <EmployeeSearchTable /> : <Navigate to="/login" />}
        />
        <Route path="/display" element={<Display />} />
      </Routes>
    </>
  );
};

export default App;













// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import './App.css';
// import About from './components/About';
// import EmpPersonalDetailsForm from './components/EmpPersonalDetailsForm';
// import Login from './components/LoginPage';
// import Navbar from './components/Navbar';
// import EmployeeSearchTable from './components/EmployeeSearchTable';
// import './Navbar.css';
// import './EmpDetailsForm.css'
// import './EmployeeSearchTable.css'
// import EmpProjectDetailsForm from './components/EmpProjectDetailsForm';
// import EmpSkillsCertificationForm from './components/EmpSkillsCertificationForm';
// import Display from './redux/Display';



// function App() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<EmpPersonalDetailsForm />} />
//         <Route path="/emp-project-details" element={<EmpProjectDetailsForm />} />
//         <Route path="/emp-certificates-skills-form" element={<EmpSkillsCertificationForm/>}/>
//         <Route path="/about" element={<About />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/resume.html" element={<resume />} />
//         <Route path="/hrview" element={<EmployeeSearchTable />} />
//         <Route path="/display" element={<Display />}   />
//         </Routes>
//     </>
//   );
// }

// export default App;
