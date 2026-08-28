import { motion } from 'framer-motion';
import './FloatingDoodles.css';

const DOODLES = [
    { symbol: '★', className: 'doodle d1', duration: 6 },
    { symbol: '✦', className: 'doodle d2', duration: 8 },
    { symbol: '◇', className: 'doodle d3', duration: 7 },
    { symbol: '✧', className: 'doodle d4', duration: 9 },
    { symbol: '⚡', className: 'doodle d5', duration: 5 },
    { symbol: '☆', className: 'doodle d6', duration: 10 },
];

const FloatingDoodles = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return null;

    return (
        <div className="floating-doodles" aria-hidden="true">
            {DOODLES.map((doodle) => (
                <motion.span
                    key={doodle.className}
                    className={doodle.className}
                    animate={{
                        y: [0, -18, 0, 12, 0],
                        rotate: [0, 10, -8, 5, 0],
                        opacity: [0.15, 0.35, 0.2, 0.3, 0.15],
                    }}
                    transition={{
                        duration: doodle.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    {doodle.symbol}
                </motion.span>
            ))}
        </div>
    );
};

export default FloatingDoodles;
