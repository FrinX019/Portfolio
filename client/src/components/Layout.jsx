import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import CustomCursor from './CustomCursor';
import './Layout.css';

const Layout = ({ children }) => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/projects', label: 'Projects' },
        { path: '/resume', label: 'Resume' },
        { path: '/contact', label: 'Contact' },
        { path: '/links', label: 'Links' },
    ];

    return (
        <div className="layout-container">
            <CustomCursor />

            <nav className="floating-nav">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link to={item.path} className={location.pathname === item.path ? 'active' : ''}>
                                {item.label}
                                {location.pathname === item.path && (
                                    <motion.div
                                        className="nav-indicator"
                                        layoutId="nav-indicator"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <main className="page-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
