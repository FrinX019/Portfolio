import React from 'react';
import { motion } from 'framer-motion';
import './Links.css';

const linksData = [
    {
        id: 1,
        title: "GitHub",
        url: "https://github.com/FrinX019",
        icon: "🐙"
    },
    {
        id: 2,
        title: "LinkedIn",
        url: "https://www.linkedin.com/in/frinx019",
        icon: "💼"
    },
    {
        id: 3,
        title: "LeetCode",
        url: "https://leetcode.com/u/FrinX1903/",
        icon: "💻"
    },
    {
        id: 4,
        title: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/user/frinx019/",
        icon: "🤓"
    }
];

const Links = () => {
    return (
        <motion.div
            className="links-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
        >
            <h2 className="links-title">Connect With Me</h2>
            <div className="links-list">
                {linksData.map((link, index) => (
                    <motion.a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-item"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                    >
                        <span className="link-icon">{link.icon}</span>
                        <span className="link-text">{link.title}</span>
                    </motion.a>
                ))}
            </div>
        </motion.div>
    );
};

export default Links;
