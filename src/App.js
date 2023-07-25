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
       // Send the login request to the backend
       const response = await axios.post('http://localhost:8080/login', {
        username: username,
        password: password,
      });
      // Handle the response based on the message property
      if (response.data.message === 'Login successful') {
        // Login successful
        setIsLoggedIn(true);
      } else {
        // Login failed
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log('Login error:', error);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);

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
