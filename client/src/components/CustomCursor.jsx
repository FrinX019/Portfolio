import { useEffect, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const positionRef = useRef({ x: 0, y: 0 });
    const frameRef = useRef(null);
    const isInteractiveRef = useRef(false);
    const isTouchDevice = useRef(
        typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
    );

    useEffect(() => {
        if (isTouchDevice.current) return;

        const cursor = cursorRef.current;
        if (!cursor) return;

        const updatePosition = () => {
            const { x, y } = positionRef.current;
            cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
            frameRef.current = null;
        };

        const onMouseMove = (e) => {
            positionRef.current = { x: e.clientX, y: e.clientY };

            if (!frameRef.current) {
                frameRef.current = requestAnimationFrame(updatePosition);
            }
        };

        const onMouseOver = (e) => {
            const isInteractive =
                e.target.closest('a, button, input, textarea, select, label, [role="button"]') !== null;

            if (isInteractive !== isInteractiveRef.current) {
                isInteractiveRef.current = isInteractive;
                cursor.classList.toggle('custom-cursor--interactive', isInteractive);
            }
        };

        const onMouseLeave = () => {
            cursor.style.opacity = '0';
        };

        const onMouseEnter = () => {
            cursor.style.opacity = '1';
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        document.addEventListener('mouseover', onMouseOver, { passive: true });
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, []);

    if (isTouchDevice.current) return null;

    return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
};

export default CustomCursor;
