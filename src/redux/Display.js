import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getSkills } from './store';
import axios from 'axios';
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
        console.log("skill", skill.skills); // Example: Logging each skill item to the console
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
            // Include other employee properties
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
        <div>
            <h1>Employee Details</h1>
            <p>Name: {empname}</p>
            <p>Email: {empemail}</p>
            <p>Phone Number: {empphonenumber}</p>
            <p>Address: {empaddress}</p>
            <p>Zip Code: {empzipcode}</p>
            <p>Profile Summary: {empprofileSummary}</p>
            <h2>Skills:</h2>

            {uniqueSkills.map((skill, index) => (
                <div key={index}>
                    <p>{skill.join(",")}</p>
                </div>
            ))}

            <h2>Projects:</h2>
            {projects.map((project, index) => {
                const technologiesUsed = Object.values(project.project.technologiesUsed);


                return (
                    <div key={index}>
                        <h3>Project {index + 1}</h3>
                        <p>Project Name: {project.project.name}</p>
                        <p>Start Date: {project.project.startDate}</p>
                        <p>End Date: {project.project.endDate}</p>
                        <p>Technologies Used: {technologiesUsed.join(",")}</p>
                        <p>Roles and Responsibilities: {project.project.rolesAndResponsibilities}</p>
                        <p>Project Description: {project.project.projectDescription}</p>
                        {/* Display other project properties */}
                    </div>
                );
            })}

            <h2>Certificates:</h2>
            {certificates.map((certificate, index) => {
                console.log("certificate", certificate);
                return (
                    <div key={index}>
                        <h3>Certificate {index + 1}</h3>
                        <p>Certificate Name: {certificate.certificate.certificationName}</p>
                        <p>Certificate Start Date: {certificate.certificate.certificationStartDate}</p>
                        <p>Certificate Expiry Date: {certificate.certificate.certificationExpiryDate}</p>
                        {/* Display other certificate properties */}
                    </div>
                );
            })}
            <button onClick={handleDataSubmit}>Submit Data</button>
        </div>
    );
};

export default Display;