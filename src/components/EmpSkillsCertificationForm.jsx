import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaChevronRight, FaChevronLeft, FaTimes, FaPlus } from 'react-icons/fa';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { useSelector, useDispatch } from 'react-redux';
import { addSkillsCertificates,updateCertificationName,updateCertificationStartDate,updateCertificationEndDate } from '../redux/certificateSlice';
import { updateSkills } from '../redux/skillsSlice';
const EmpSkillCertificationForm = () => {
  const certificates = useSelector((state) => state.certificates);
  const skils = useSelector((state) => state.skills);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { employee, projects } = location.state || {};

  const [certifications, setCertifications] = useState([
    {
      certificationName: '',
      certificationStartDate: '',
      certificationExpiryDate: '',
      errors: {},
    },
  ]);

  const [skills, setSkills] = useState([]);

  const handleCertificationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = { ...updatedCertifications[index], [name]: value };
    setCertifications(updatedCertifications);
  };

  const handleAddCertification = () => {
    setCertifications([
      ...certifications,
      {
        certificationName: '',
        certificationStartDate: '',
        certificationExpiryDate: '',
        errors: {},
      },
    ]);
  };

  const handleRemoveCertification = (index) => {
    const updatedCertifications = [...certifications];
    updatedCertifications.splice(index, 1);
    setCertifications(updatedCertifications);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log(certifications);
      console.log(skills);
      dispatch(addSkillsCertificates(certificates));
      dispatch(updateSkills(skills));
      //dispatch(updateSkills(employee.skills));
      navigate('/resume', {state: { employee: skills, certifications }}); 
      console.log( 'data',{state: { employee: skills, certifications }});
      // Perform form submission or any other desired action
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    const updatedCertifications = [...certifications];

    for (let i = 0; i < updatedCertifications.length; i++) {
      const certification = updatedCertifications[i];
      const errors = {};

      if (certification.certificationName.trim() === '') {
        errors.certificationName = 'Please enter a certification name';
        formIsValid = false;
      }


      if (certification.certificationStartDate.trim() === '') {
        errors.certificationStartDate = 'Please select a certification start date';
        formIsValid = false;
      }

      if (certification.certificationExpiryDate.trim() === '') {
        errors.certificationExpiryDate = 'Please select a certification expiry date';
        formIsValid = false;
      }

      updatedCertifications[i].errors = errors;
      dispatch(updateCertificationName({ index: i, name: certification.certificationName }));
      dispatch(updateCertificationStartDate({ index: i, startDate: certification.certificationStartDate }));
      dispatch(updateCertificationEndDate({ index: i, endDate: certification.certificationExpiryDate }));
  
    }

    setCertifications(updatedCertifications);
    return formIsValid;
  };

  const handlePrevious = () => {
    navigate('/emp-project-details', { state: { certifications } }); // Navigate to the previous form (EmpProjectDetailsForm)
  };

  return (
    <>
      <div className='container'>
        <section className='emp_details_form'>
          <div className='form-heading-block'>
            <h2 className='my-3 form-heading'>Employee Skills & Certifications</h2>
          </div>
          <div className='form-container'>
            <form className='p-4 form_block'>
              {certifications.map((certification, index) => (
                <div key={index} className='certification-details my-3'>
                  <h4 className='text-center'>
                    Certification {index + 1}
                    <button type='button' className='add-certification-button float-right' onClick={handleAddCertification}>
                      <FaPlus className='plus-icon' />
                    </button>
                  </h4>
                  <div className={`form-group row my-3 d-flex align-items-center justify-content-center ${certification.errors.certificationName ? 'has-error' : ''}`}>
                    <label htmlFor={`certificationName-${index}`} className='col-md-4 col-form-label text-start'>
                      Certification Name
                    </label>
                    <div className='col-md-8'>
                      <input
                        type='text'
                        id={`certificationName-${index}`}
                        name='certificationName'
                        value={certification.certificationName}
                        onChange={(e) => handleCertificationChange(index, e)}
                        placeholder='Enter Certification Name'
                        className={`form-control ${certification.errors.certificationName ? 'is-invalid' : ''}`}
                        required
                      />
                      {certification.errors.certificationName && <div className='invalid-feedback'>{certification.errors.certificationName}</div>}
                    </div>
                  </div>
                  {/* <div className={`form-group row my-3 d-flex align-items-center justify-content-center ${certification.errors.certificationAuthority ? 'has-error' : ''}`}>
                    <label htmlFor={`certificationAuthority-${index}`} className='col-md-4 col-form-label text-start'>
                      Certification Authority
                    </label>
                    <div className='col-md-8'>
                      <input
                        type='text'
                        id={`certificationAuthority-${index}`}
                        name='certificationAuthority'
                        value={certification.certificationAuthority}
                        onChange={(e) => handleCertificationChange(index, e)}
                        placeholder='Enter Certification Authority'
                        className={`form-control ${certification.errors.certificationAuthority ? 'is-invalid' : ''}`}
                        required
                      />
                      {certification.errors.certificationAuthority && (
                        <div className='invalid-feedback'>{certification.errors.certificationAuthority}</div>
                      )}
                    </div>
                  </div> */}
                  <div className={`form-group row my-3 d-flex align-items-center justify-content-center ${certification.errors.certificationStartDate ? 'has-error' : ''}`}>
                    <label htmlFor={`certificationStartDate-${index}`} className='col-md-4 col-form-label text-start'>
                      Certification Start Date
                    </label>
                    <div className='col-md-8'>
                      <input
                        type='date'
                        id={`certificationStartDate-${index}`}
                        name='certificationStartDate'
                        value={certification.certificationStartDate}
                        onChange={(e) => handleCertificationChange(index, e)}
                        className={`form-control ${certification.errors.certificationStartDate ? 'is-invalid' : ''}`}
                        required
                      />
                      {certification.errors.certificationStartDate && <div className='invalid-feedback'>{certification.errors.certificationStartDate}</div>}
                    </div>
                  </div>
                  <div className={`form-group row my-3 d-flex align-items-center justify-content-center ${certification.errors.certificationExpiryDate ? 'has-error' : ''}`}>
                    <label htmlFor={`certificationExpiryDate-${index}`} className='col-md-4 col-form-label text-start'>
                      Certification Expiry Date
                    </label>
                    <div className='col-md-8'>
                      <input
                        type='date'
                        id={`certificationExpiryDate-${index}`}
                        name='certificationExpiryDate'
                        value={certification.certificationExpiryDate}
                        onChange={(e) => handleCertificationChange(index, e)}
                        className={`form-control ${certification.errors.certificationExpiryDate ? 'is-invalid' : ''}`}
                        required
                      />
                      {certification.errors.certificationExpiryDate && <div className='invalid-feedback'>{certification.errors.certificationExpiryDate}</div>}
                    </div>
                  </div>
                  {index > 0 && (
                    <div className='form-group row my-3 d-flex align-items-center justify-content-end'>
                      <div className='col-sm-12 col-md-12 d-flex justify-content-end'>
                        <button type='button' className='btn btn-danger' onClick={() => handleRemoveCertification(index)}>
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div className='skills-details my-5'>
                
                <div className={`form-group row my-3 d-flex align-items-center justify-content-center`}>
                  
                  <label htmlFor="skills" className='col-md-4 col-form-label text-start'>
                      Skills
                    </label>
                  
                  <div className='col-md-8'>
                    <TagsInput
                      value={skills}
                      onChange={(tags) => setSkills(tags)}
                      inputProps={{
                        placeholder: 'Add Skills',
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className='form-group row mb-3 d-flex align-items-center justify-content-center text-end'>
                <div className='col-sm-12 col-md-12 d-flex justify-content-between'>
                  <button type='button' className='btn btn-secondary' onClick={handlePrevious}>
                    <FaChevronLeft /> Previous
                  </button>
                  <button type='button' className='btn btn-primary' onClick={handleSubmit}>
                    Submit
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

export default EmpSkillCertificationForm;
