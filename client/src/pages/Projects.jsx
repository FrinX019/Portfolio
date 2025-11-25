import React from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const projectsData = [
    {
        id: 1,
        title: "All Purpose CPQ Capstone Project",
        description: "Full-stack CPQ platform with dynamic pricing, formula creation, and automated PDF quote generation.",
        tags: ["Java", "Spring Boot", "React", "Oracle 19c", "Docker"],
        image: "/allpurposecpq.png",
        link: "https://github.com/FrinX019/AllPurposeCPQ"
    },
    {
        id: 2,
        title: "Vehicle Maintenance System",
        description: "Full-stack system for authentication, scheduling, invoicing, and inventory tracking.",
        tags: ["Java", "PLSQL", "JavaFX", "Spring Boot"],
        image: "/vehicle_maintenance.png",
        link: "https://github.com/FrinX019/CoreTech"
    },
    {
        id: 3,
        title: "Archie GameStore",
        description: "A recent game store project I'm working on.",
        tags: ["React", "Node.js"],
        image: "/archi_gamestore.png",
        link: "https://github.com/FrinX019/Archie_GameStore"
    },
    {
        id: 4,
        title: "Airbnb API",
        description: "Airbnb API assignment implementation.",
        tags: ["API", "Backend"],
        image: "/airbnb_api.png",
        link: "https://github.com/FrinX019/airbnb-api-Frin"
    }
];

const Projects = () => {
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
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{
                            y: -10,
                            rotateX: 5,
                            rotateY: 5,
                            boxShadow: "0 20px 40px rgba(0, 243, 255, 0.2)"
                        }}
                    >
                        <div className="card-image">
                            <img src={project.image} alt={project.title} />
                            <div className="card-overlay">
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="view-btn">View Code</a>
                            </div>
                        </div>
                        <div className="card-content">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="tags">
                                {project.tags.map(tag => (
                                    <span key={tag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Projects;
