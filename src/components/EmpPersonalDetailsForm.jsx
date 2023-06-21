import React, { useState } from 'react';
import '../EmpDetailsForm.css';
import axios from 'axios';

const EmpPersonalDetailsForm = () => {
  const [searchText, setSearchText] = useState('');
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phonenumber: '',
    address: '',
    zipcode: '',
    profilesummary: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!employee.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!employee.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(employee.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!employee.phonenumber.trim()) {
      newErrors.phonenumber = 'Phone is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(employee.phonenumber)) {
      newErrors.phonenumber = 'Phone is invalid';
      isValid = false;
    }

    if (!employee.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    if (!employee.zipcode.trim()) {
      newErrors.zipcode = 'Zip Code is required';
      isValid = false;
    }

    if (!employee.profilesummary.trim()) {
      newErrors.profilesummary = 'Profile Summary is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('http://localhost:8080/api/v1/employees/save', employee);
        console.log('Employee added successfully');


      } catch (error) {
        console.error('Failed to add employee:', error);
      }
      console.log(employee);
    }
  };



  return (
    <>
      <div className='container'>
        <section className='emp_details_form'>
          <div className='form-heading-block'>
            <h2 className='my-3 form-heading'>Employee Personal Details</h2>
          </div>
          <div className='form-container'>

            <form onSubmit={handleSubmit} className='p-4 form_block'>


              <div className="form-group row my-3 d-flex align-items-center justify-content-center">
                <label htmlFor="name" className=' col-md-4 col-form-label text-start'>Name</label>
                <div className='col-md-8'>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    placeholder='Enter Full Name'
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

              </div>

              <div className="form-group row my-3 d-flex align-items-center justify-content-center">
                <label htmlFor="email" className="col-md-4 col-form-label text-start">Email</label>
                <div className="col-md-8">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                    placeholder='Enter Email'
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
              </div>


              <div className="form-group row my-3 d-flex align-items-center justify-content-center">
                <label htmlFor="phonenumber" className="col-md-4 col-form-label text-start">Phone</label>
                <div className="col-md-8">
                  <input
                    type="tel"
                    id="phonenumber"
                    name="phonenumber"
                    value={employee.phonenumber}
                    onChange={handleChange}
                    placeholder='Enter Phone'
                    className={`form-control ${errors.phonenumber ? 'is-invalid' : ''}`}
                  />
                  {errors.phonenumber && <div className="invalid-feedback">{errors.phonenumber}</div>}
                </div>
              </div>
              <div className="form-group row my-3 d-flex align-items-center justify-content-center">
                <label htmlFor="address" className="col-md-4 col-form-label text-start">Address</label>
                <div className="col-md-8">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={employee.address}
                    onChange={handleChange}
                    placeholder='Enter Address'
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                  />
                  {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>
              </div>


              <div className="form-group row mb-3 d-flex align-items-center justify-content-center">
                <label htmlFor="zipcode" className="col-md-4 col-form-label text-start">Postal Code</label>
                <div className="col-md-8">
                  <input
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    value={employee.zipcode}
                    onChange={handleChange}
                    placeholder='Enter Postal Code'
                    className={`form-control ${errors.zipcode ? 'is-invalid' : ''}`}
                  />
                  {errors.zipcode && <div className="invalid-feedback">{errors.zipcode}</div>}
                </div>

              </div>
              <div className="form-group row mb-3 d-flex align-items-center justify-content-center">
                <label htmlFor="profilesummary" className="col-md-4 col-form-label text-start">Profile Summary</label>
                <div className="col-md-8">
                  <textarea
                    id="profilesummary"
                    name="profilesummary"
                    value={employee.profilesummary}
                    onChange={handleChange}
                    placeholder='Enter Summary'
                    className={`form-control ${errors.profilesummary ? 'is-invalid' : ''}`}
                  />
                  {errors.profilesummary && <div className="invalid-feedback">{errors.profilesummary}</div>}
                </div>
              </div>


              <div className="form-group row mb-3 d-flex align-items-center justify-content-center  text-end" >
                <div className="col-sm-10  offset-sm-2">
                  <button type="submit" className="btn btn-primary ">Submit</button>
                </div>
              </div>

            </form>
          </div>









        </section>
      </div>
    </>



  );
};

export default EmpPersonalDetailsForm;
