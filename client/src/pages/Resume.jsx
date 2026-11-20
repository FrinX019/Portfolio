import React from 'react';
import { motion } from 'framer-motion';
import './Resume.css';

const Resume = () => {
    return (
        <motion.div
            className="resume-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="resume-header">
                <h2>Resume</h2>
                <a href="/Frin_Resume.pdf" download="Frin_Patel_Resume.pdf" className="download-btn">
                    Download PDF
                </a>
            </div>

            <div className="resume-section">
                <h3 className="section-header">Experience</h3>
                <div className="timeline">
                    <div className="timeline-item">
                        <div className="timeline-date">Jan 2026 – Apr 2026</div>
                        <div className="timeline-content">
                            <h3>Software Developer — Industry-Sponsored Capstone</h3>
                            <h4>All Purpose Tech</h4>
                            <ul>
                                <li>Led a 4-person Agile team that delivered a configure, price, quote (CPQ) admin portal in 4 months and presented the final build to the industry sponsor.</li>
                                <li>Connected 3 React admin modules to Spring Boot REST APIs and Oracle 19c for quote configuration.</li>
                                <li>Built secured REST APIs with Java, Spring MVC, and Hibernate/JPA, wrote JUnit tests, and set up Docker containerization and GitHub Actions CI/CD.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-date">Jan 2024 – May 2024</div>
                        <div className="timeline-content">
                            <h3>Full Stack Developer Intern</h3>
                            <h4>Brainybeam Info-Tech PVT LTD</h4>
                            <ul>
                                <li>Improved billing data retrieval speed by 40% through changes to Python transaction processing.</li>
                                <li>Integrated QR-code generation into the billing system and optimized the backend logic that generates invoices.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="resume-section">
                <h3 className="section-header">Education</h3>
                <div className="timeline">
                    <div className="timeline-item">
                        <div className="timeline-date">Sept 2024 - April 2026</div>
                        <div className="timeline-content">
                            <h3>PG in Information Technology Solutions</h3>
                            <h4>Humber College</h4>
                            <p>GPA: 3.74/4.00</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-date">August 2020 - May 2024</div>
                        <div className="timeline-content">
                            <h3>BEng in Computer Engineering</h3>
                            <h4>Gujarat Technological University</h4>
                            <p>GPA: 3.26/4.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Resume;
