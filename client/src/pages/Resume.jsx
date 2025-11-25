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
                        <div className="timeline-date">Jan 2024 – May 2024</div>
                        <div className="timeline-content">
                            <h3>Full Stack Developer Intern</h3>
                            <h4>Brainybeam Info-Tech PVT LTD</h4>
                            <ul>
                                <li>Streamlined the QR code generation process, reducing average generation time by 1.5 seconds.</li>
                                <li>Engineered an advanced transaction optimization mechanism, boosting transaction speed by 40%.</li>
                                <li>Documented and standardized the implementation process for QR code functionality.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-date">July 2023 – Aug 2023</div>
                        <div className="timeline-content">
                            <h3>Data Analytics and Machine Learning Intern</h3>
                            <h4>INFOLABZ IT SERVICES PVT. LTD.</h4>
                            <ul>
                                <li>Designed responsive user interfaces leveraging Pandas, improving user satisfaction by 15%.</li>
                                <li>Introduced automated testing with TensorFlow Serving, increasing test coverage by 30%.</li>
                                <li>Spearheaded adoption of agile methodologies, improving team productivity by 15%.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="resume-section">
                <h3 className="section-header">Education</h3>
                <div className="timeline">
                    <div className="timeline-item">
                        <div className="timeline-date">Sept 2024 - Present</div>
                        <div className="timeline-content">
                            <h3>PG in Information Technology Solutions</h3>
                            <h4>Humber College</h4>
                            <p>GPA: 3.60/4.00</p>
                        </div>
                    </div>
                    <div className="timeline-item">
                        <div className="timeline-date">May 2024</div>
                        <div className="timeline-content">
                            <h3>BEng in Computer Engineering</h3>
                            <h4>Kalol Institute Of Technology And Research Centre</h4>
                            <p>GPA: 3.26/4.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Resume;
