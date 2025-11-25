import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState("default");

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener("mousemove", mouseMove);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 10,
            y: mousePosition.y - 10,
            backgroundColor: "rgba(0,0,0,0.1)",
            border: "2px solid var(--text-color)",
            height: 20,
            width: 20,
            borderRadius: "50%",
            transition: {
                type: "spring",
                mass: 0.3
            }
        },
        text: {
            height: 60,
            width: 60,
            x: mousePosition.x - 30,
            y: mousePosition.y - 30,
            backgroundColor: "var(--primary-color)",
            mixBlendMode: "multiply",
            border: "2px dashed var(--text-color)",
            transition: {
                type: "spring",
                mass: 0.3
            }
        }
    };

    return (
        <motion.div
            className="custom-cursor"
            variants={variants}
            animate={cursorVariant}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 9999
            }}
        />
    );
};

export default CustomCursor;
