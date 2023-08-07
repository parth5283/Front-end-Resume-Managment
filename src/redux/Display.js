import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { useSelector } from 'react-redux';
import { getSkills } from './store';
import axios from '../apis/ResumeFinder'
import logo from '../images/preview-page-logo.png';
import '../CSS/previewdata.css';
import { useDispatch } from 'react-redux';
import { resetCertificateState } from './certificateSlice';
import { resetSkillState } from './skillSlice';
import { Send, KeyboardArrowLeft } from '@mui/icons-material';



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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = location;
    const previewDataDisplayRef = React.createRef();

    const uniqueSkills = [...new Set(skills.map((skill) => skill.skills))];

    const handleBack = () => {
        dispatch(resetCertificateState());
        dispatch(resetSkillState());
        navigate('/emp-certificates-skills-form', { state: { ...state } });
    }

    const handleDataSubmit = async () => {
        try {
            const employeeData = {
                name: empname,
                email: empemail,
                phonenumber: empphonenumber,
                address: empaddress,
                zipcode: empzipcode,
                profilesummary: empprofileSummary,
            };

            const employeeResponse = await axios.post('/add-employee', employeeData);

            const { message, employeeId } = employeeResponse.data;
            console.log("message", message);

            const projectData = projects.map((project) => ({
                employeeId: employeeResponse.data.employeeId,
                project: {
                    projectname: project.project.name,
                    startdate: project.project.startDate,
                    enddate: project.project.endDate,
                    technologiesused: project.project.technologiesUsed.join(","),
                    rolesandresponsibilities: project.project.rolesAndResponsibilities,
                    projectdescription: project.project.projectDescription,
                },
            }));

            await axios.post('/add-projects', { projects: projectData });

            const certificateData = certificates.map((certificate) => ({
                employeeId: employeeResponse.data.employeeId,
                certificate: {
                    certificationname: certificate.certificate.certificationName,
                    certificationdate: certificate.certificate.certificationStartDate,
                    certificationexpirydate: certificate.certificate.certificationExpiryDate,
                    technicalskills: uniqueSkills,
                },
            }));

            await axios.post('/add-certificate-details', { certificates: certificateData });

            const pdfElement = previewDataDisplayRef.current;
            const clonedPdfElement = pdfElement.cloneNode(true);
            clonedPdfElement.style.height = 'auto';
            const opt = {
                filename: `${empname}-resume.pdf`,
                jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' },
                html2canvas: { scale: 2 },
                html2pdf: {
                    margin: [50, 20, 20, 30],
                },
            };

            const pdf = new html2pdf().from(clonedPdfElement).set(opt);
            const pdfBlob = await pdf.output('blob');
            const formData = new FormData();
            formData.append('employeeId', employeeId);
            formData.append('pdfData', pdfBlob);

            await axios.post('/save-PDFtoDb', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/success');
        } catch (error) {
            navigate('/error');
        }
    };



    return (
        <>
            <div className='container'>
                <section className='preview-data-display ' ref={previewDataDisplayRef}>
                    <div className="row company-description mb-4">
                        <div className="col-md-6 d-flex align-items-center justify-content-center logo-wrapper">
                            <img src={logo} alt="cabot-logo" />
                        </div>
                        <div className="col-md-6 d-flex align-items-center address-wrapper">
                            <div className="company-address">
                                <div className='text-right'>
                                    204, Second Floor,<br />
                                    Lulu Cyber Tower I,<br />
                                    Infopark,<br />
                                    Kochi- 682 042<br />
                                    info@cabotsolutions.com<br />
                                    +91-484-404-5555<br />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className='horizontal-break' />
                    <div className='row employee-name-block'>
                        <div className='col-md-12 text-center employee-name-wrapper'>
                            <h2 className='font-weight-bold employee-name'>{empname}</h2>
                        </div>
                    </div>
                    <hr className='horizontal-break' />
                    <div className='row profile-summary-wrapper'>
                        <div className='col-md-12 summary-heading text-start'>
                            <h4 className='font-weight-bold'>Profile Summary</h4>
                        </div>
                        <div className='col-md-12 summary-details'>
                            <div className='formatted-text' dangerouslySetInnerHTML={{ __html: empprofileSummary }} />
                        </div>
                    </div>
                    <hr className='horizontal-break' />
                    <div className="row Certifications-block">
                        <div className="col-md-12 certifications-heading-block">
                            <h4 className="font-weight-bold">Licences/Certifications</h4>
                        </div>
                        <div className="col-md-12 certification-details">
                            {certificates.map((certificate, index) => {
                                return (
                                    <div key={index} className='row my-2'>
                                        <div className="col-md-6">
                                            <strong>Certificate Name:</strong> {certificate.certificate.certificationName}
                                        </div>
                                        <div className="col-md-6">
                                            <strong>Certificate Validity:</strong> {certificate.certificate.certificationStartDate} to {certificate.certificate.certificationExpiryDate}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <hr className='horizontal-break' />
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
                    <hr className='horizontal-break' />
                    <div className="row project-summary-block page-break-before">
                        <div className="col-md-12 project-summary-heading">
                            <h4 className="font-weight-bold">Project Summary</h4>
                        </div>
                        <div className="row project-details ">
                            {projects.map((project, index) => {
                                const technologiesUsed = Object.values(project.project.technologiesUsed);
                                const startDate = new Date(project.project.startDate);
                                const endDate = new Date(project.project.endDate);
                                const startMonthYear = startDate.toLocaleString('default', { month: 'long', year: 'numeric' });
                                const endMonthYear = endDate.toLocaleString('default', { month: 'long', year: 'numeric' });
                                return (
                                    <div key={index} className="col-md-12 my-2 project-item">
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <span className="project-name-label font-weight-bold">{project.project.name}</span>
                                            </div>
                                            <div className='col-md-6 text-end '>
                                                <span className="project-name-value">{startMonthYear} - {endMonthYear}</span>
                                            </div>
                                        </div>
                                        <div className='row my-3 '>
                                            <div className='col-md-3'>
                                                <span className="project-technologies-label">Technologies Used:</span>
                                            </div>
                                            <div className='col-md-9'>
                                                <span className="project-technologies-value">{technologiesUsed.join(", ")}</span>
                                            </div>
                                        </div>
                                        <div className='row my-3'>
                                            <div className='col-md-3'>
                                                <span className="project-roles-label">Roles and Responsibilities:</span>
                                            </div>
                                            <div className='col-md-9  text-justify'>
                                                <span className='formatted-text project-roles-value' dangerouslySetInnerHTML={{ __html: project.project.rolesAndResponsibilities }} />
                                            </div>
                                        </div>
                                        <div className='row my-3'>
                                            <div className='col-md-3'>
                                                <span className="project-description-label">Project Description:</span>
                                            </div>
                                            <div className='col-md-9 text-justify'>
                                                <span className='formatted-text project-description-value' dangerouslySetInnerHTML={{ __html: project.project.projectDescription }} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <hr className='horizontal-break' />
                </section>
                <div className="submit-button-blocks">
                    <div className="row">
                        <div className="col-md-6 text-start">
                            <button className="btn btn-secondary fixed-width-btn justify-text" onClick={handleBack}><KeyboardArrowLeft /> Back</button>
                        </div>
                        <div className="col-md-6 text-end">
                            <button variant="contained" className="btn btn-primary fixed-width-btn justify-text" onClick={handleDataSubmit}>Submit <Send className='send-btn' /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};



export default Display;

