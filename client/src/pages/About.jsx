import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './About.css';

const About = () => {
    const photos = [
        '/IMG_0424.jpeg',
        '/IMG_0443.jpeg',
        '/IMG_0593.jpeg',
        '/IMG_0632.jpeg'
    ];

    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
        }, 3000); // Change photo every 3 seconds

        return () => clearInterval(interval);
    }, [photos.length]);

    return (
        <motion.div
            className="about-container"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
        >
            <div className="about-content">
                <motion.div
                    className="about-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2>About Me</h2>
                    <p>
                        I'm a Full Stack Developer and founder of Annoraa, a software company building tools that simplify operations for field service businesses. My first product, SUTRA, is a live multi-tenant SaaS platform designed for fire protection companies — covering everything from inspections and work orders to quotes, invoices, and mobile technician workflows. I built it end-to-end using React, Next.js, Expo, MongoDB, and Node.js, and it's actively used in production today.</p>
                    <p> Alongside Annoraa, I've built production-grade Java applications using Spring Boot, Hibernate/JPA, and Oracle — including a full CPQ platform delivered for an industry client. I'm passionate about solving real operational problems through clean, scalable software, and I'm currently open to junior or intermediate developer roles remote or on-site, where I can keep growing while continuing to build Annoraa on the side.</p>
                    <div className="skills-grid">
                        {['Java', 'Spring Boot', 'React', 'Node.js', 'Oracle 19c', 'MongoDB', 'Python', 'Docker', 'AWS'].map((skill, index) => (
                            <motion.div
                                key={skill}
                                className="skill-tag"
                                whileHover={{ scale: 1.1, backgroundColor: "var(--primary-color)", color: "#000" }}
                            >
                                {skill}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="about-image"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="photo-carousel">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentPhotoIndex}
                                src={photos[currentPhotoIndex]}
                                alt={`Frin Patel ${currentPhotoIndex + 1}`}
                                className="carousel-image"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                            />
                        </AnimatePresence>
                        <div className="carousel-indicators">
                            {photos.map((_, index) => (
                                <button
                                    key={index}
                                    className={`indicator ${index === currentPhotoIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentPhotoIndex(index)}
                                    aria-label={`Go to photo ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default About;
