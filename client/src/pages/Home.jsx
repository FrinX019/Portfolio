import React from 'react';
import { motion } from 'framer-motion';
import './Home.css';
import { Link } from "react-router-dom";    

const Home = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
        exit: {
            opacity: 0,
            transition: { ease: 'easeInOut' }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    return (
        <motion.div
            className="home-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="hero-content">
                <motion.h1 variants={itemVariants} className="glitch-effect" data-text="CREATIVE">
                    CREATIVE
                </motion.h1>
                <motion.h1 variants={itemVariants} className="glitch-effect" data-text="DEVELOPER">
                    DEVELOPER
                </motion.h1>
                <motion.p variants={itemVariants} className="subtitle">
                    Building digital experiences that <span className="highlight">hit different</span>.
                </motion.p>
                <motion.div variants={itemVariants} className="cta-group">
                   <a href=""><Link to="/projects" className="btn-primary">View Work</Link></a>
                    <Link to="/contact" className="btn-secondary">Let's Talk</Link>
                </motion.div>
            </div>

            <div className="background-elements">
                <motion.div
                    className="circle c1"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                        borderRadius: ["50%", "40%", "50%"]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="circle c2"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0],
                        borderRadius: ["40%", "50%", "40%"]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
            </div>
        </motion.div>
    );
};

export default Home;
