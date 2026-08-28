import { createContext, useCallback, useEffect, useRef, useState } from 'react';

const SECRET_SEQUENCE = 'frin';
const FOOTER_CLICK_THRESHOLD = 5;
const FOOTER_CLICK_WINDOW_MS = 2000;

const TerminalContext = createContext(null);

export { TerminalContext };

const isEditableTarget = (target) => {
    if (!target || !(target instanceof HTMLElement)) return false;
    const tag = target.tagName;
    return (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        target.isContentEditable
    );
};

export const TerminalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [terminalSession, setTerminalSession] = useState(0);
    const [sequenceProgress, setSequenceProgress] = useState(0);
    const [sequenceShake, setSequenceShake] = useState(false);
    const sequenceRef = useRef('');
    const footerClicksRef = useRef(0);
    const footerTimerRef = useRef(null);
    const shakeTimerRef = useRef(null);

    const openTerminal = useCallback(() => {
        setTerminalSession((session) => session + 1);
        setIsOpen(true);
        sequenceRef.current = '';
        setSequenceProgress(0);
    }, []);

    const closeTerminal = useCallback(() => {
        setIsOpen(false);
        sequenceRef.current = '';
        setSequenceProgress(0);
    }, []);

    const registerFooterClick = useCallback(() => {
        footerClicksRef.current += 1;
        clearTimeout(footerTimerRef.current);
        footerTimerRef.current = setTimeout(() => {
            footerClicksRef.current = 0;
        }, FOOTER_CLICK_WINDOW_MS);

        if (footerClicksRef.current >= FOOTER_CLICK_THRESHOLD) {
            footerClicksRef.current = 0;
            openTerminal();
        }
    }, [openTerminal]);

    const triggerShake = useCallback(() => {
        setSequenceShake(true);
        clearTimeout(shakeTimerRef.current);
        shakeTimerRef.current = setTimeout(() => setSequenceShake(false), 400);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isEditableTarget(e.target)) return;
            if (isOpen) return;
            if (e.ctrlKey || e.metaKey || e.altKey) return;
            if (e.key.length !== 1) return;

            const char = e.key.toLowerCase();
            const expected = SECRET_SEQUENCE[sequenceRef.current.length];

            if (char === expected) {
                sequenceRef.current += char;
                setSequenceProgress(sequenceRef.current.length);

                if (sequenceRef.current === SECRET_SEQUENCE) {
                    e.preventDefault();
                    openTerminal();
                }
                return;
            }

            if (char === SECRET_SEQUENCE[0]) {
                sequenceRef.current = char;
                setSequenceProgress(1);
                return;
            }

            sequenceRef.current = '';
            setSequenceProgress(0);
            triggerShake();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, openTerminal, triggerShake]);

    useEffect(() => {
        return () => {
            clearTimeout(footerTimerRef.current);
            clearTimeout(shakeTimerRef.current);
        };
    }, []);

    const typedPrefix = SECRET_SEQUENCE.slice(0, sequenceProgress);
    const remainingBlanks = '_'.repeat(SECRET_SEQUENCE.length - sequenceProgress);

    return (
        <TerminalContext.Provider
            value={{
                isOpen,
                terminalSession,
                openTerminal,
                closeTerminal,
                registerFooterClick,
                typedPrefix,
                remainingBlanks,
                sequenceShake,
                sequenceProgress,
            }}
        >
            {children}
        </TerminalContext.Provider>
    );
};
