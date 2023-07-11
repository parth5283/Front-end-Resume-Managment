import React, { useState, useEffect } from 'react';
import '../EmployeeSearchTable.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeSearchTable = () => {
  const [searchText, setSearchText] = useState('');
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/employees');
        setEmployees(response.data);
      } catch (error) {
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
      console.log('Record deleted successfully');

      // Remove the deleted record from the table
      const updatedEmployees = employees.filter((employee) => employee.employeeid !== id);
      setEmployees(updatedEmployees);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };


  const handleDownload = async (employeeId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/employees/resume/${employeeId}`, {
        responseType: 'text', // Set responseType to 'text' to receive the response as a string
      });
    
      const base64Data = response.data;
      const binaryData = atob(base64Data); // Decode the Base64 data
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const uint8Array = new Uint8Array(arrayBuffer);
    
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }
    
      const blob = new Blob([uint8Array], { type: 'application/pdf' }); // Create a Blob object with the decoded data
      const url = URL.createObjectURL(blob); // Create a URL for the Blob object
    
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
    
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error retrieving resume file:', error);
    }
  };


  const handleView = async (employeeId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/employees/resume/${employeeId}`);
  
      const base64Data = response.data;
      const binaryData = atob(base64Data); // Decode the Base64 data
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const uint8Array = new Uint8Array(arrayBuffer);
  
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }
  
      const file = new Blob([uint8Array], { type: 'application/pdf' }); // Create a Blob object with the decoded data
      const fileURL = URL.createObjectURL(file); // Create a URL for the Blob object
  
      window.open(fileURL); // Open the PDF in a new window
    } catch (error) {
      console.error('Error retrieving resume file:', error);
    }
  };

  // const filteredEmployees = employees.filter(
  //   (employee) =>
  //     employee.id.toString().includes(searchText) ||
  //     employee.name.toLowerCase().includes(searchText.toLowerCase())
  // );

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
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleSearch}
                    >
                      <i className="fas fa-search"></i>
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
                      <th>Employee ID</th>
                      <th>Employee Name</th>
                      <th>Employee Email ID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.employeeid}>
                        <td>{employee.employeeid}</td>
                        <td>{employee.name}</td>
                        <td>
                          <a href={`mailto:${employee.email}`}>{employee.email}</a>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm mx-1"
                            onClick={() => handleDelete(employee.employeeid)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                          <button
                            className="btn btn-primary btn-sm mx-1"
                            onClick={() => handleDownload(employee.employeeid)}
                          >
                            <i className="fas fa-download"></i>
                          </button>
                          <button
                            className="btn btn-success btn-sm mx-1"
                            onClick={() => handleView(employee.employeeid)}
                          >
                            <i className="fas fa-eye"></i>
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
