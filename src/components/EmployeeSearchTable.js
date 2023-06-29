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


  const handleDownload = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/employees/${id}/pdf`, {
        responseType: 'blob',
      });

      // Create a temporary URL for the blob data
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary link element and trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `employee_${id}.pdf`);
      document.body.appendChild(link);
      link.click();

      // Clean up the temporary URL and link element
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };




  const handleView = (employeeId) => {
    window.open(`http://localhost:8080/pdf-generator/${employeeId}`, '_blank');
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
