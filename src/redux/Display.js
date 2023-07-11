import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getSkills } from './store';
import axios from 'axios';
import logo from '../images/preview-page-logo.png';
import '../previewdata.css';

const Display = () => {
    const empname = useSelector((state) => state.employee.name);
    const empemail = useSelector((state) => state.employee.email);
    const empphonenumber = useSelector((state) => state.employee.phonenumber);
    const empaddress = useSelector((state) => state.employee.address);
    const empzipcode = useSelector((state) => state.employee.zipcode);
    const empprofileSummary = useSelector((state) => state.employee.profilesummary);
    const projects = useSelector((state) => state.project.projects);
    const certificates = useSelector((state) => state.certificate.certificates);
    const skills = getSkills();
    const location = useLocation();
    
    
    const { employee } = location.state || {};
    const uniqueSkills = [...new Set(skills.map((skill) => skill.skills))];
    console.log("skills", skills);
    skills.forEach(skill => {
        console.log("skill", skill.skills);
    });
    
    const handleDataSubmit = async () => {
        const employeeData = {
            name: empname,
            email: empemail,
            phonenumber: empphonenumber,
            email: empemail,
            address: empaddress,
            zipcode: empzipcode,
            profilesummary: empprofileSummary,

        };
        const employeeResponse = await axios.post('http://localhost:8080/api/v1/employees/add-employee', employeeData);

        const { message, employeeId } = employeeResponse.data;
        console.log("message", message);
        console.log("employeeId", employeeId);
        // Submit project data
        const projectData = projects.map((project) => ({
            employeeId: employeeResponse.data.employeeId,
            project: {
                projectname: project.project.name,
                startdate: project.project.startDate,
                enddate: project.project.endDate,
                technologiesused: project.project.technologiesUsed.join(","),
                rolesandresponsibilities: project.project.rolesAndResponsibilities,
                projectdescription: project.project.projectDescription,
            }
        }));
        console.log("project Data:", projectData);
        axios.post('http://localhost:8080/api/v1/employees/add-projects', { projects: projectData })
            .then((response) => {
                console.log('Data stored successfully:', response.data);
            })
            .catch((error) => {
                console.log('An error occurred:', error);
            });

        const certificateData = certificates.map((certificate) => ({
            employeeId: employeeResponse.data.employeeId,
            certificate: {
                certificationname: certificate.certificate.certificationName,
                certificationdate: certificate.certificate.certificationStartDate,
                certificationexpirydate: certificate.certificate.certificationExpiryDate,
                technicalskills: uniqueSkills,

            }
        }));
        console.log("certificate Data:", certificateData);
        axios.post('http://localhost:8080/api/v1/employees/add-certificate-details', { certificates: certificateData })
            .then((response) => {
                console.log('Data stored successfully:', response.data);
            })
            .catch((error) => {
                console.log('An error occurred:', error);
            });
    }
    return (
        <>
            <div className='container'>
                <section className='preview-data-display '>

                    <div className="row company-description">
                        <div className="col-md-6 d-flex align-items-center justify-content-center logo-wrapper">
                            <img src={logo} alt="cabot-logo" />
                        </div>
                        <div className="col-md-6 d-flex align-items-center address-wrapper">
                            <div className="company-address">
                            <p>
                                    {empaddress},
                                    <br />
                                    {empzipcode}
                                    <br />
                                    {empemail}
                                    <br />
                                    {empphonenumber}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='row employee-name-block'>

                        <div className='col-md-12 text-center employee-name-wrapper'>
                            <h2 className='font-weight-bold employee-name'>{empname}</h2>
                        </div>
                    </div>
                    <div className='row profile-summary-wrapper'>
                        <div className='col-md-12 summary-heading text-start'>
                            <h4 className='font-weight-bold'>Profile Summary</h4>
                        </div>
                        <div className='col-md-12 summary-details'>
                            <p>
                                {empprofileSummary}
                            </p>
                        </div>
                    </div>

                    <div className="row Certifications-block">
                        <div className="col-md-12 certifications-heading-block">
                            <h4 className="font-weight-bold">Licences/Certifications (if any)</h4>
                        </div>
                        <div className="col-md-12 certification-details">
                            {certificates.map((certificate, index) => {
                                console.log("certificate", certificate);
                                return (
                                    <div key={index}>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <strong>Certificate Name:</strong> {certificate.certificate.certificationName}
                                            </div>
                                            <div className="col-md-6">
                                                <strong>Certificate Validity:</strong> {certificate.certificate.certificationStartDate} to {certificate.certificate.certificationExpiryDate}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="row technical-skills-block">
                        <div className="col-md-12 skills-heading text-start">
                            <h4 className="font-weight-bold">Technical Skills</h4>
                        </div>
                        <div className="col-md-12 skills-details">
                            {uniqueSkills.map((skill, index) => (
                                <span key={index} className="skills">
                                    {skill.join(",   ")}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="row project-summary-block">
                        <div className="col-md-12 project-summary-heading">
                            <h4 className="font-weight-bold">Project Summary</h4>
                        </div>
                        <div className="col-md-12 project-details">
                            <table className="table table-bordered table-collapse">
                                <tbody>
                                    {projects.map((project, index) => {
                                        const technologiesUsed = Object.values(project.project.technologiesUsed);
                                        const startDate = new Date(project.project.startDate);
                                        const endDate = new Date(project.project.endDate);
                                        const startMonthYear = startDate.toLocaleString('default', { month: 'long', year: 'numeric' });
                                        const endMonthYear = endDate.toLocaleString('default', { month: 'long', year: 'numeric' });

                                        return (
                                            <><tr key={index}>
                                                <th className="col-4" style={{ border: '1px solid #000' }}>Project Name:</th>
                                                <td className="col-8" style={{ border: '1px solid #000' }}>{project.project.name}</td>
                                            </tr><tr>
                                                    <th className="col-4" style={{ border: '1px solid #000' }}>Timeline:</th>
                                                    <td className="col-8" style={{ border: '1px solid #000' }}>{startMonthYear} - {endMonthYear}</td>
                                                </tr><tr>
                                                    <th className="col-4" style={{ border: '1px solid #000' }}>Technologies Used:</th>
                                                    <td className="col-8" style={{ border: '1px solid #000' }}>{technologiesUsed.join(", ")}</td>
                                                </tr><tr>
                                                    <th className="col-4" style={{ border: '1px solid #000' }}>Roles and Responsibilities:</th>
                                                    <td className="col-8" style={{ border: '1px solid #000' }}>{project.project.rolesAndResponsibilities}</td>
                                                </tr><tr>
                                                    <th className="col-4" style={{ border: '1px solid #000' }}>Project Description:</th>
                                                    <td className="col-8" style={{ border: '1px solid #000' }}>{project.project.projectDescription}</td>
                                                </tr></>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>




                </section>

                <div className="submit-button-blocks">
                    <div className="row">
                        <div className="col-md-6 text-start">
                            {/* <button className="btn btn-secondary" onClick={handleBack}>Back</button> */}
                        </div>
                        <div className="col-md-6 text-end">
                            <button className="btn btn-primary" onClick={handleDataSubmit}>Submit</button>
                        </div>
                    </div>
                </div>


            </div>

        </>

    );
};

export default Display;



