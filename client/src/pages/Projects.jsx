import React from 'react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './Projects.css';

const projectsData = [
    {
        id: 1,
        title: "SUTRA – Field Service Management SaaS",
        description: "Multi-tenant SaaS platform for fire protection companies covering 8 feature domains: clients, work orders, inspections, quotes, invoices, time entries, tenant branding, and user management across a React web portal and Expo mobile app.",
        tags: ["React 19", "Next.js 14", "Expo", "MongoDB", "JWT", "PDFKit"],
        image: "/sutra-project-poster.jpeg",
        link: "https://github.com/FrinX019/SUTRA",
        liveLink: "https://sutrabyannoraa.vercel.app/login"
    },
    {
        id: 2,
        title: "All-Purpose CPQ",
        description: "Full-stack Configure, Price, Quote platform using Java, Spring Boot, and React/Next.js. Features role-based admin and customer portals, secure REST APIs, JUnit testing, and containerized deployment via Docker and GitHub Actions CI/CD.",
        tags: ["Java", "Spring Boot", "React", "Oracle 19c", "Docker"],
        image: "/allpurposecpq.png",
        link: "https://github.com/FrinX019/AllPurposeCPQ",
        liveLink: "https://admin.allpurposecpq.com/"
    },
    {
        id: 3,
        title: "Vehicle Maintenance & Service Management",
        description: "Full-stack Vehicle Maintenance System using JavaFX, Spring Boot, and Oracle 19c for authentication, scheduling, invoicing, and inventory tracking. Improved report efficiency 30% via optimized PL/SQL procedures and SYS_REFCURSOR.",
        tags: ["Java", "PL/SQL", "JavaFX", "Spring Boot", "Oracle 19c"],
        image: "/vehicle_maintenance.png",
        link: "https://github.com/FrinX019/CoreTech"
    },
    {
        id: 4,
        title: "Archie GameStore",
        description: "A recent game store project I'm working on.",
        tags: ["React", "Node.js"],
        image: "/archi_gamestore.png",
        link: "https://github.com/FrinX019/Archie_GameStore"
    },
    {
        id: 5,
        title: "Airbnb API",
        description: "Airbnb API assignment implementation.",
        tags: ["API", "Backend"],
        image: "/airbnb_api.png",
        link: "https://github.com/FrinX019/airbnb-api-Frin"
    }
];

const Projects = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <motion.div
            className="projects-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h2 className="section-title">Selected Works</h2>
            <div className="projects-grid">
                {projectsData.map((project, index) => (
                    <motion.div
                        key={project.id}
                        className="project-card"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: isMobile ? 0 : index * 0.2, duration: 0.5 }}
                        whileHover={!isMobile ? {
                            y: -10,
                            boxShadow: "0 20px 40px rgba(0, 243, 255, 0.2)"
                        } : {}}
                    >
                        <div className="card-image">
                            <img src={project.image} alt={project.title} />
                            <div className="card-overlay">
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="view-btn">View Code</a>
                                {project.liveLink && project.liveLink !== "#" && (
                                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="view-btn live-btn">Live App</a>
                                )}
                            </div>
                        </div>
                        <div className="card-content">
                            <div className="card-title-row">
                                <h3>{project.title}</h3>
                                {project.liveLink && (
                                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="live-tag">Live ↗</a>
                                )}
                            </div>
                            <p>{project.description}</p>
                            <div className="tags">
                                {project.tags.map(tag => (
                                    <span key={tag}>{tag}</span>
                                ))}
                            </div>
                            <div className="card-links">
                                <button
                                    className="card-link-btn"
                                    onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
                                >
                                    View Code
                                </button>
                                {project.liveLink && project.liveLink !== "#" && (
                                    <button
                                        className="card-link-btn live-link-btn"
                                        onClick={() => window.open(project.liveLink, '_blank', 'noopener,noreferrer')}
                                    >
                                        Live App
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Projects;
