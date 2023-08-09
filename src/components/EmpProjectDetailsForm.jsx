import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-tagsinput/react-tagsinput.css';
import TagsInput from 'react-tagsinput';
import { useDispatch } from 'react-redux';
import { Fab, IconButton } from '@mui/material';
import { Add, Delete, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import RichTextEditor from './RichTextEditor';
import '../CSS/EmpDetailsForm.css';
import { addProject, updateProjectName, updateStartDate, updateEndDate, updateTechnologiesUsed, updateRolesAndResponsbilities, updateProjectDescription } from '../redux/projectSlice';



const EmpProjectDetailsForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = location;
  const { employee } = location.state || {};
  const [projects, setProjects] = useState(state?.projects || [
    {
      projectName: '',
      startDate: '',
      endDate: '',
      technologiesUsed: [],
      rolesAndResponsibilities: '',
      projectDescription: '',
      errors: {},
    },
  ]);



  useEffect(() => {
    const storedProjects = sessionStorage.getItem('projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      setProjects(state?.projects || [
        {
          projectName: '',
          startDate: '',
          endDate: '',
          technologiesUsed: [],
          rolesAndResponsibilities: '',
          projectDescription: '',
          errors: {},
        },
      ]);
    }
  }, [state]);



  useEffect(() => {
    sessionStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);



  const formatDateInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };



  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], [name]: value };

    if (name === 'endDate' && value < updatedProjects[index].startDate) {
      const errors = { ...updatedProjects[index].errors };
      errors.endDate = 'End date cannot be before the start date';
      updatedProjects[index].errors = errors;
    } else {
      const errors = { ...updatedProjects[index].errors };
      delete errors.endDate;
      updatedProjects[index].errors = errors;
    }

    if (name === 'startDate' || name === 'endDate') {
      const yearPattern = /^\d{1,4}$/; // Regular expression for 1 to 4 digits
      const currentDate = new Date(value);
      const year = currentDate.getFullYear().toString();
      if (!year.match(yearPattern) || currentDate.getFullYear() < 1950) {
        const errors = { ...updatedProjects[index].errors };
        errors[name] = 'Invalid year';
        updatedProjects[index].errors = errors;
      } else {
        const errors = { ...updatedProjects[index].errors };
        delete errors[name];
        updatedProjects[index].errors = errors;
      }

      const formattedDate = formatDateInput(currentDate);
      e.target.value = formattedDate;
    }

    setProjects(updatedProjects);
  };



  const handleTechnologiesChange = (index, tags) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], technologiesUsed: tags };

    const errors = { ...updatedProjects[index].errors };
    if (tags.length === 0) {
      errors.technologiesUsed = 'Please enter at least one technology used';
    } else {
      delete errors.technologiesUsed;
    }
    updatedProjects[index].errors = errors;
    setProjects(updatedProjects);
  };



  const handleAddProject = () => {
    const newProject = {
      projectName: '',
      startDate: '',
      endDate: '',
      technologiesUsed: [],
      rolesAndResponsibilities: '',
      projectDescription: '',
      errors: {},
    };

    setProjects([...projects, newProject]);
  };



  const handleRemoveProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };



  const handlePrevious = () => {
    navigate('/', { state: { ...state, employee } });
  };



  const handleNext = () => {
    if (validateForm()) {
      projects.forEach((project, index) => {
        dispatch(updateProjectName({ index, name: project.projectName }));
        dispatch(updateStartDate({ index, startDate: project.startDate }));
        dispatch(updateEndDate({ index, endDate: project.endDate }));
        dispatch(updateTechnologiesUsed({ index, technologiesUsed: project.technologiesUsed }));
        dispatch(updateRolesAndResponsbilities({ index, rolesAndResponsibilities: project.rolesAndResponsibilities }));
        dispatch(updateProjectDescription({ index, projectDescription: project.projectDescription }));
      });
      navigate('/emp-certificates-skills-form', { state: { ...state, projects } });
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    const updatedProjects = [...projects];

    for (let i = 0; i < updatedProjects.length; i++) {
      const project = updatedProjects[i];
      const errors = {};

      if (project.projectName.trim() === '') {
        errors.projectName = 'Please enter a project name';
        formIsValid = false;
      }

      if (project.startDate.trim() === '') {
        errors.startDate = 'Please select a start date';
        formIsValid = false;
      }

      if (project.endDate.trim() === '') {
        errors.endDate = 'Please select an end date';
        formIsValid = false;
      }

      if (project.technologiesUsed.length === 0) {
        errors.technologiesUsed = 'Please enter at least one technology used';
        formIsValid = false;
      }

      if (project.rolesAndResponsibilities.trim() === '') {
        errors.rolesAndResponsibilities = 'Please enter roles and responsibilities';
        formIsValid = false;
      }

      if (project.projectDescription.trim() === '') {
        errors.projectDescription = 'Please enter a project description';
        formIsValid = false;
      }

      updatedProjects[i].errors = errors;
      dispatch(addProject({
        index: i,
        project: {
          name: project.projectName,
          startDate: project.startDate,
          endDate: project.endDate,
          technologiesUsed: project.technologiesUsed,
          rolesAndResponsibilities: project.rolesAndResponsibilities,
          projectDescription: project.projectDescription,
        },
      }));
    }

    setProjects(updatedProjects);
    return formIsValid;
  };



  return (
    <>
      <div className='container'>
        <section className='emp_details_form'>
          <div className='form-heading-block'>
            <h2 className='my-3 form-heading'>Employee Project Details</h2>
          </div>
          <div className='form-container'>
            <form className='p-4 form_block'>
              {projects.map((project, index) => (
                <div key={index} className='project-details my-3'>
                  <h4 className='text-center'>
                    Project {index + 1}
                    <div className='add-btn-wrapper'>
                      <Fab color='primary' aria-label='add' className='add-project-button' onClick={handleAddProject}>
                        <Add />
                      </Fab>
                    </div>
                  </h4>
                  <div className={`form-group row my-3 d-flex align-items-center justify-content-center ${project.errors.projectName ? 'has-error' : ''}`}>
                    <label htmlFor={`projectName-${index}`} className='col-md-4 col-form-label text-start'>
                      Project Name
                    </label>
                    <div className='col-md-8'>
                      <input
                        type='text'
                        id={`projectName-${index}`}
                        name='projectName'
                        value={project.projectName}
                        onChange={(e) => handleProjectChange(index, e)}
                        placeholder='Enter Project Name'
                        className={`form-control ${project.errors.projectName ? 'is-invalid' : ''}`}
                        required
                      />
                      {project.errors.projectName && <div className='invalid-feedback'>{project.errors.projectName}</div>}
                    </div>
                  </div>
                  <div className={`form-group row my-3 d-flex align-items-center justify-content-center ${project.errors.startDate ? 'has-error' : ''}`}>
                    <label htmlFor={`startDate-${index}`} className='col-md-4 col-form-label text-start'>
                      Start Date
                    </label>
                    <div className='col-md-8'>
                      <input
                        type='date'
                        id={`startDate-${index}`}
                        name='startDate'
                        value={project.startDate}
                        onChange={(e) => handleProjectChange(index, e)}
                        className={`form-control ${project.errors.startDate ? 'is-invalid' : ''}`}
                        required
                      />
                      {project.errors.startDate && <div className='invalid-feedback'>{project.errors.startDate}</div>}
                    </div>
                  </div>
                  <div className={`form-group row my-3 d-flex align-items-center justify-content-center ${project.errors.endDate ? 'has-error' : ''}`}>
                    <label htmlFor={`endDate-${index}`} className='col-md-4 col-form-label text-start'>
                      End Date
                    </label>
                    <div className='col-md-8'>
                      <input
                        type='date'
                        id={`endDate-${index}`}
                        name='endDate'
                        value={project.endDate}
                        onChange={(e) => handleProjectChange(index, e)}
                        className={`form-control ${project.errors.endDate ? 'is-invalid' : ''}`}
                        required
                      />
                      {project.errors.endDate && <div className='invalid-feedback'>{project.errors.endDate}</div>}
                    </div>
                  </div>
                  <div className={`form-group row my-3 d-flex align-items-center justify-content-center ${project.errors.technologiesUsed ? 'has-error' : ''}`}>
                    <label htmlFor={`technologiesUsed-${index}`} className='col-md-4 col-form-label text-start'>
                      Technologies Used
                    </label>
                    <div className='col-md-8'>
                      <TagsInput
                        value={project.technologiesUsed}
                        onChange={(tags) => handleTechnologiesChange(index, tags)}
                        inputProps={{
                          placeholder: 'Enter Technologies Used',
                          className: `form-control ${project.errors.technologiesUsed ? 'is-invalid' : ''}`,
                        }}
                        required
                      />
                      {project.errors.technologiesUsed && <div className='invalid-feedback'>{project.errors.technologiesUsed}</div>}
                    </div>
                  </div>

                  <div className={`form-group row my-3 d-flex align-items-center justify-content-center ${project.errors.rolesAndResponsibilities ? 'has-error' : ''}`}>
                    <label htmlFor={`rolesAndResponsibilities-${index}`} className='col-md-4 col-form-label text-start'>
                      Roles and Responsibilities
                    </label>
                    <div className='col-md-8'>
                      <RichTextEditor
                        id={`rolesAndResponsibilities-${index}`}
                        name='rolesAndResponsibilities'
                        value={project.rolesAndResponsibilities}
                        onChange={(value) => handleProjectChange(index, { target: { name: 'rolesAndResponsibilities', value } })}
                        placeholder='Enter Roles and Responsibilities'
                        error={project.errors.rolesAndResponsibilities}
                        errorMessage="Roles and Responsibilities are required"
                      />
                    </div>
                    {project.errors.rolesAndResponsibilities && <div className='invalid-feedback'>{project.errors.rolesAndResponsibilities}</div>}
                  </div>
                  <div className={`form-group row my-3 d-flex align-items-center justify-content-center ${project.errors.projectDescription ? 'has-error' : ''}`}>
                    <label htmlFor={`projectDescription-${index}`} className='col-md-4 col-form-label text-start'>
                      Project Description
                    </label>
                    <div className='col-md-8'>
                      <RichTextEditor
                        id={`projectDescription-${index}`}
                        name='projectDescription'
                        value={project.projectDescription}
                        onChange={(value) => handleProjectChange(index, { target: { name: 'projectDescription', value } })}
                        placeholder='Enter Project Description'
                        error={project.errors.projectDescription}
                        errorMessage="Project Description is required"
                      />
                    </div>
                    {project.errors.projectDescription && <div className='invalid-feedback'>{project.errors.projectDescription}</div>}
                  </div>
                  {index > 0 && (
                    <div className='form-group row my-3 d-flex align-items-center justify-content-end'>
                      <div className='col-sm-12 col-md-12 d-flex justify-content-end'>
                        <IconButton className='delete-project-button' onClick={() => handleRemoveProject(index)}>
                          <Delete />
                        </IconButton>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div className='form-group row mb-3 d-flex align-items-center justify-content-center  px-3'>
                <div className=' col-md-6 d-flex text-start'>
                  <button type='button' className='btn btn-secondary fixed-width-btn justify-text' onClick={handlePrevious}>
                    <KeyboardArrowLeft /> Previous
                  </button>
                </div>
                <div className='col-md-6 text-end'>
                  <button type='button' className='btn btn-primary fixed-width-btn justify-text' onClick={handleNext}>
                    Next <KeyboardArrowRight />
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



export default EmpProjectDetailsForm;


