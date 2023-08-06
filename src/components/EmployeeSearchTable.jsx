import React, { useState, useEffect } from 'react';
import '../CSS/EmployeeSearchTable.css';
import axios from 'axios';
import { Delete, Download, Visibility, Search } from '@mui/icons-material';



const EmployeeSearchTable = () => {
  const [searchText, setSearchText] = useState('');
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/employees');
        setEmployees(response.data);
      } 
      catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchData();
  }, []);



  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };



  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/employees/${id}`);
      const updatedEmployees = employees.filter((employee) => employee.employeeid !== id);
      setEmployees(updatedEmployees);
    } 
    catch (error) {
    }
  };



  const handleDownload = async (employeeid) => {
    axios
      .get(`http://localhost:8080/api/v1/employees/resume/${employeeid}`, {
        responseType: 'blob', // This is important to handle binary data
      })
      .then((response) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = reader.result.split(',')[1];
          const decode = atob(base64Data);
          const byteArray = new Uint8Array(
            atob(decode).split('').map((char) => char.charCodeAt(0))
          );
          const blob = new Blob([byteArray], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          const tempAnchor = document.createElement('a');
          const emps = employees;
          const employee = emps.find((emp) => emp.employeeid === employeeid);
          if (employee) {
            const { name } = employee;
            tempAnchor.setAttribute('download', `${name}-resume.pdf`);
            tempAnchor.href = url;
            tempAnchor.click();
          } else {}
          URL.revokeObjectURL(url);
        };
        reader.readAsDataURL(response.data);
      })
      .catch((error) => {
        console.error('Error fetching resume:', error);
      });
  };



  const handleView = (employeeid) => {
    axios
      .get(`http://localhost:8080/api/v1/employees/resume/${employeeid}`, {
        responseType: 'blob',
      })
      .then((response) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = reader.result.split(',')[1];
          const decode = atob(base64Data);
          const byteArray = new Uint8Array(
            atob(decode).split('').map((char) => char.charCodeAt(0))
          );
          const blob = new Blob([byteArray], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          window.open(url, '_blank');
        };
        reader.readAsDataURL(response.data);
      })
      .catch((error) => {
        console.error('Error fetching resume:', error);
      });
  };



  const filteredEmployees = employees.filter(
    (employee) =>
      employee.employeeid.toString().includes(searchText.toString()) ||
      employee.name.toLowerCase().includes(searchText.toLowerCase())
  );



  return (
    <>
      <div className='container'>
        <section className="hr_view_section">
          <div className='hr_view_container'>

            <div className="form-group row my-3 d-flex align-items-center justify-content-center">
              <label htmlFor="searchInput" className="col-md-8 col-form-label text-end">
                Search
              </label>
              <div className="col-md-4">
                <div className="input-group">
                  <input
                    type="text"
                    id="searchInput"
                    className="form-control"
                    value={searchText}
                    onChange={handleSearch}
                    placeholder="Enter Employee ID or Name"
                  />
                  <div className="input-group-append" style={{ height: '38px' }}>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleSearch}
                    >
                      <Search />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="table_content row ">
              <div className="col-md-12">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th className='text-center'>Employee ID</th>
                      <th className='text-center'>Employee Name</th>
                      <th className='text-center'>Employee Email ID</th>
                      <th className='text-center'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.employeeid}>
                        <td>{employee.employeeid}</td>
                        <td>{employee.name}</td>
                        <td className="email-cell">
                          <a href={`mailto:${employee.email}`}>
                            {employee.email}
                          </a>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm mx-1"
                            onClick={() => handleDelete(employee.employeeid)}
                          >
                            <Delete />
                          </button>
                          <button
                            className="btn btn-primary btn-sm mx-1"
                            onClick={() => handleDownload(employee.employeeid)}
                          >
                            <Download />
                          </button>
                          <button
                            className="btn btn-success btn-sm mx-1"
                            onClick={() => handleView(employee.employeeid)}
                          >
                            <Visibility />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};



export default EmployeeSearchTable;



