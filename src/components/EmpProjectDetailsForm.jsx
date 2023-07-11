import React, { useState,useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaChevronRight, FaChevronLeft, FaTimes, FaPlus } from 'react-icons/fa';
import 'react-tagsinput/react-tagsinput.css';
import TagsInput from 'react-tagsinput';
import { useSelector, useDispatch } from 'react-redux';
import {addProject,updateProjectName,updateStartDate,updateEndDate,updateTechnologiesUsed,updateRolesAndResponsbilities,updateProjectDescription  } from '../redux/projectSlice';


const EmpProjectDetailsForm = () => {
  const projectss = useSelector((state) => state.project.projects);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { employee, skills, certificates, previousData } = location.state || {};

  const [projects, setProjects] = useState(previousData || [
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
    if (previousData) {
      setProjects(previousData);
    }
  }, [previousData]);

  

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], [name]: value };
  
    // Check if the end date is before the start date
    if (name === 'endDate' && value < updatedProjects[index].startDate) {
      const errors = { ...updatedProjects[index].errors };
      errors.endDate = 'End date cannot be before the start date';
      updatedProjects[index].errors = errors;
    } else {
      const errors = { ...updatedProjects[index].errors };
      delete errors.endDate;
      updatedProjects[index].errors = errors;
    }
  
    setProjects(updatedProjects);
  };
  

  const handleTechnologiesChange = (index, tags) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], technologiesUsed: tags };
    
    // Validation for Technologies Used
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
    
  navigate('/', { state: { employee, projects } });
};

  

  const handleNext = () => {
    if (validateForm()) {
     // dispatch(saveProjectDetails(projects));
     projects.forEach((project, index) => {
      dispatch(updateProjectName({ index, name: project.projectName }));
      dispatch(updateStartDate({ index, startDate: project.startDate }));
      dispatch(updateEndDate({ index, endDate: project.endDate }));
      dispatch(updateTechnologiesUsed({ index, technologiesUsed: project.technologiesUsed }));
      dispatch(updateRolesAndResponsbilities({ index, rolesAndResponsibilities: project.rolesAndResponsibilities }));
      dispatch(updateProjectDescription({ index, projectDescription: project.projectDescription }));
    });
    console.log("Projects",projects)
    
     //console.log("projectReducer",projectss);
      navigate('/emp-certificates-skills-form', { state: { employee, projects,skills,certificates } });
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let i;
    const updatedProjects = [...projects];

    for (let i = 0; i < updatedProjects.length; i++) {
      const project = updatedProjects[i];
      const errors = {};
         console.log("loop",i);
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
                    <button type='button' className='add-project-button float-right' onClick={handleAddProject}>
                      <FaPlus className='plus-icon' />
                    </button>
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
                      <textarea
                        id={`rolesAndResponsibilities-${index}`}
                        name='rolesAndResponsibilities'
                        value={project.rolesAndResponsibilities}
                        onChange={(e) => handleProjectChange(index, e)}
                        placeholder='Enter Roles and Responsibilities'
                        className={`form-control ${project.errors.rolesAndResponsibilities ? 'is-invalid' : ''}`}
                        required
                      />
                      {project.errors.rolesAndResponsibilities && <div className='invalid-feedback'>{project.errors.rolesAndResponsibilities}</div>}
                    </div>
                  </div>
                  <div className={`form-group row my-3 d-flex align-items-center justify-content-center ${project.errors.projectDescription ? 'has-error' : ''}`}>
                    <label htmlFor={`projectDescription-${index}`} className='col-md-4 col-form-label text-start'>
                      Project Description
                    </label>
                    <div className='col-md-8'>
                      <textarea
                        id={`projectDescription-${index}`}
                        name='projectDescription'
                        value={project.projectDescription}
                        onChange={(e) => handleProjectChange(index, e)}
                        placeholder='Enter Project Description'
                        className={`form-control ${project.errors.projectDescription ? 'is-invalid' : ''}`}
                        required
                      />
                      {project.errors.projectDescription && <div className='invalid-feedback'>{project.errors.projectDescription}</div>}
                    </div>
                  </div>
                  {index > 0 && (
                    <div className='form-group row my-3 d-flex align-items-center justify-content-end'>
                      <div className='col-sm-12 col-md-12 d-flex justify-content-end'>
                        <button type='button' className='btn btn-danger' onClick={() => handleRemoveProject(index)}>
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div className='form-group row mb-3 d-flex align-items-center justify-content-center text-end'>
                <div className='col-sm-12 col-md-12 d-flex justify-content-between'>
                  <button type='button' className='btn btn-secondary' onClick={handlePrevious}>
                    <FaChevronLeft /> Previous
                  </button>
                  <button type='button' className='btn btn-primary' onClick={handleNext}>
                    Next <FaChevronRight />
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
