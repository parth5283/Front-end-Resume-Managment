import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateName, updateEmail, updatePhoneNumber, updateAddress, updateZipCode, updateProfileSummary } from '../redux/employeeSlice';
import { KeyboardArrowRight } from '@mui/icons-material';


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // You may choose a different Quill theme or create a custom one.


const EmpPersonalDetailsForm = () => {
  // const employeePersonal = useSelector((state) => state.employee);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = location;
  const [errors, setErrors] = useState({});
  const [employee, setEmployee] = useState(state?.employee || {
    name: '',
    email: '',
    phonenumber: '',
    address: '',
    zipcode: '',
    profilesummary: ''
  });

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ],
  };

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'link',
  ];

  // Retrieve employee data from location state when navigating back from EmpProjectDetailsForm
  useEffect(() => {
    if (location.state && location.state.employee) {
      setEmployee(location.state.employee);
    }
  }, [location.state]);


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
      newErrors.email = 'Enter a valid Email';
      isValid = false;
    }
    if (!employee.phonenumber.trim()) {
      newErrors.phonenumber = 'Phone is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(employee.phonenumber)) {
      newErrors.phonenumber = 'Enter a valid Phone number';
      isValid = false;
    }
    if (!employee.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }
    if (!employee.zipcode.trim()) {
      newErrors.zipcode = 'Postal Code is required';
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


  const handleNext = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // console.log('Dispatching updateName:', employee.name);
      dispatch(updateName(employee.name));
      dispatch(updateEmail(employee.email));
      dispatch(updatePhoneNumber(employee.phonenumber));
      dispatch(updateAddress(employee.address));
      dispatch(updateZipCode(employee.zipcode));
      dispatch(updateProfileSummary(employee.profilesummary));
      // console.log('Dispatching employee:', { state: { employee } });
      navigate('/emp-project-details', { state: { employee } });
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
        <label htmlFor="profilesummary" className="col-md-4 col-form-label text-start">
          Profile Summary
        </label>
        <div className="col-md-8">
          {/* Replace the textarea with the React Quill editor */}
          <ReactQuill
            id="profilesummary"
            name="profilesummary"
            value={employee.profilesummary}
            onChange={(value) => handleChange({ target: { name: 'profilesummary', value } })}
            placeholder="Enter Summary"
            modules={quillModules}
            formats={quillFormats}
          />
          {errors.profilesummary && <div className="invalid-feedback">{errors.profilesummary}</div>}
        </div>
      </div>



              <div className="form-group row mb-3 d-flex align-items-center justify-content-center  text-end" >
                <div className="col-md-12">
                  <button onClick={handleNext} className="btn btn-primary fixed-width-btn justify-text">Next
                    <KeyboardArrowRight />
                  </button>
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
