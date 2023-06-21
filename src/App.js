import { Routes, Route } from 'react-router-dom';
import './App.css';
import About from './components/About';
import EmpPersonalDetailsForm from './components/EmpPersonalDetailsForm';
import Login from './components/Login';
import Navbar from './components/Navbar';
import EmployeeSearchTable from './components/EmployeeSearchTable';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<EmpPersonalDetailsForm />} />
        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />

        <Route path="/hrview" element={<EmployeeSearchTable />} />
      </Routes>


    </>
  );
}

export default App;
